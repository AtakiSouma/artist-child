import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Course } from "../models/course.model";
import HeaderDetailScreen from "../components/HeaderDetailScreen";
import ImageComponent from "../components/ImageComponent";
import { appInfo } from "../constants/appInfos";
import SectionComponent from "../components/SectionComponents";
import TextComponent from "../components/Global/TextComponent";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome6,
} from "@expo/vector-icons";
import IconCard from "../components/detailScreen/IconCard";
import { appColors } from "../constants/appColors";
import StarComponent from "../components/StarComponent";
import VideoComponent from "../components/video/VideoComponents";
import ChapterCard from "../components/detailScreen/ChapterCard";
import SpaceComponent from "../components/Global/SpaceComponent.";
import DescriptionComponent from "../components/DescriptionComponent";
import RowComponents from "../components/Global/RowComponents";
import ImagePickerComponent from "../components/ImagePickerComponent";
import * as ImagePicker from "expo-image-picker";
import LoadingLogin from "../components/LoadingCompoent";
import { useAppSelector } from "../redux/hook";
import orderApi from "../api/orderApi";
import { showSuccessToast } from "../util/toast";
import resultApi from "../api/resultApi";
import progressAPI from "../api/progressApi";
import { useFocusEffect } from "@react-navigation/native";
export interface progressData {
  _id: string;
  courseId: string;
  userId: string;
  courseContentId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const CourseDetailBought = ({ route, navigation }: any) => {
  const { item }: { item: Course } = route.params;
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [imageData, setImageDataBase64] = useState<string>("");
  const [resultMessage, setResultMessage] = useState("");
  const [progress, setProgress] = useState<progressData[]>();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      setImageDataBase64(`data:image/jpg;base64,` + result.assets[0].base64);
      setImage(result.assets[0].uri);
    }
  };
  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      const api = "/";
      const data = {
        userId: auth.currentUser.id,
        courseId: item._id,
        message: resultMessage,
        image: imageData,
      };
      await resultApi.HandleResultApi(api, data, "post");
      setLoading(false);
      setImageDataBase64("");
      setImage("");
      setResultMessage("");
      showSuccessToast();
    } catch (error) {
      setLoading(false);
      console.log("error from create result", error);
    }
  };

  // TODO:handle progress
  const handleGetProgress = async () => {
    try {
      const api = "/get-progress";
      const data = {
        courseId: item._id,
        userId: auth.currentUser.id,
      };
      const res = await progressAPI.HandleProgress(api, data, "post");
      setProgress(res.data);
    } catch (error) {
      console.log("error fetching progress", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleGetProgress();
    }, [setProgress])
  );
  console.log("item.courseContentData", item.courseContentData);
  const determineCompletionStatus = (contentId: string) => {
    return progress
      ? progress.some((item) => item.courseContentId === contentId)
      : false;
  };
  return (
    <View style={{ backgroundColor: "#F6F8FC", flex: 1 }}>
      <HeaderDetailScreen
        openDrawer={() => navigation.openDrawer()}
        goBack={() => navigation.goBack()}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ImageComponent
          stylesImage={{
            width: appInfo.sizes.WIDTH * 0.9,
            height: 200,
            borderRadius: 10,
          }}
          url={
            item.thumbnail.url
              ? item.thumbnail.url
              : "https://static.wikia.nocookie.net/houkai-star-rail/images/2/22/Profile_Picture_Sparkle_-_Illusion.png/revision/latest?cb=20240206032940"
          }
        />
        <SectionComponent>
          <TextComponent
            text={item.name || "no name"}
            title
            styles={{ fontWeight: "900" }}
          />
        </SectionComponent>
        <SectionComponent>
          <IconCard
            icon={
              <MaterialIcons
                variant="Bold"
                color={appColors.primary}
                size={24}
                name="category"
              />
            }
            title={item.categories.title}
          />
          <IconCard
            icon={
              <MaterialIcons
                variant="Bold"
                color={appColors.primary}
                size={24}
                name="rotate-90-degrees-cw"
              />
            }
            title={item.level}
          />
          <IconCard
            icon={
              <Feather name="book-open" size={24} color={appColors.primary} />
            }
            title={`${item.courseContentData.length} ${
              item.courseContentData.length > 0 ? "chapters" : "chapter"
            } `}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Video introduction"} />
          <VideoComponent videoUrl={item.demoUrl} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Course Content"} />
          <>
            {item.courseContentData.map((itemCourse, index) => (
              <View key={itemCourse._id}>
                <ChapterCard
                  data={itemCourse}
                  isCompleted={determineCompletionStatus(itemCourse._id)}
                  index={index + 1}
                  handleNavigation={() =>
                    navigation.navigate("ChapterScreen", {
                      item: itemCourse,
                      isCompleted: determineCompletionStatus(itemCourse._id),
                      courseId: item._id,
                    })
                  }
                />
              </View>
            ))}
          </>
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Upload Your Art"} />
          <RowComponents justify="flex-start">
            <Text style={{ color: appColors.primary }}>(*) </Text>
            <TextComponent
              color={appColors.gray}
              size={12}
              text={"Instructor will make your report via email.Thank you!"}
            />
          </RowComponents>
          <ImagePickerComponent
            setResultMessage={setResultMessage}
            resultMessage={resultMessage}
            image={image}
            setImage={setImage}
            pickImage={pickImage}
            handleOnSubmit={handleOnSubmit}
          />
        </SectionComponent>

        <SpaceComponent height={100} />
      </ScrollView>
      <LoadingLogin visible={loading} />
    </View>
  );
};

export default CourseDetailBought;

const styles = StyleSheet.create({});
