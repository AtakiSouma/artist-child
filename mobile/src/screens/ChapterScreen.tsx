import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CourseContent } from "../models/course.model";
import VideoComponent from "../components/video/VideoComponents";
import HeaderDetailScreen from "../components/HeaderDetailScreen";
import ButtonComponent from "../components/button/ButtonComponent";
import SectionComponent from "../components/Global/SectionComponent";
import TextComponent from "../components/Global/TextComponent";
import SpaceComponent from "../components/Global/SpaceComponent.";
import DescriptionComponent from "../components/DescriptionComponent";
import IconCard from "../components/detailScreen/IconCard";
import {
  Entypo,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { appColors } from "../constants/appColors";
import ClipBoardComponent from "../components/ClipBoard";
import RowComponents from "../components/Global/RowComponents";
import InputComponent from "../components/Input/InputComponents";
import TextSectionComponent from "../components/TextSectionComponen";
import { useAppSelector } from "../redux/hook";
import progressAPI from "../api/progressApi";
import {
  showSuccessToast,
  showSucessToastCompleteChapter,
} from "../util/toast";
import LoadingLogin from "../components/LoadingCompoent";
const ChapterScreen = ({ route, navigation }: any) => {
  const {
    item,
    isCompleted,
    courseId,
  }: { item: CourseContent; isCompleted: boolean; courseId: string } =
    route.params; // Accept isCompleted prop
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleCompleteChapter = async () => {
    setLoading(true);
    try {
      const api = "/";
      const data = {
        courseId: courseId,
        userId: auth.currentUser.id,
        courseContentId: item._id,
      };
      console.log("data", data);
      await progressAPI.HandleProgress(api, data, "post");
      setLoading(false);
      navigation.goBack();
      showSucessToastCompleteChapter();
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
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
        <SectionComponent>
          <TextComponent title text={item.title} />
          <SpaceComponent height={20} />
          <VideoComponent videoUrl={item.videoUrl} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Video description"} />
          <DescriptionComponent description={item.description} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Link Suggestion"} />
          <>
            {item.links.map((item, index) => (
              <View key={item._id}>
                <IconCard
                  icon={
                    <Entypo name="link" size={24} color={appColors.primary} />
                  }
                  title={item.title}
                />
                <ClipBoardComponent url={item.url} />
              </View>
            ))}
          </>
        </SectionComponent>

        {/* cooment */}
        <SectionComponent>
          <TextSectionComponent
            title={"Question here"}
            icon={
              <AntDesign
                name="questioncircleo"
                size={22}
                color={appColors.primary}
              />
            }
          />
          <InputComponent
            numberOfLine={4}
            onChange={(val) => setQuestion(val)}
            value={question}
            allowClear
            multiline
            placeholder="Your Question"
          />
          <RowComponents justify="flex-end">
            <ButtonComponent
              iconFlex="right"
              styles={{ width: 130 }}
              icon={
                <FontAwesome name="send" size={20} color={appColors.white} />
              }
              text="Submit"
              type="primary"
            />
          </RowComponents>
        </SectionComponent>

        <SpaceComponent height={50} />
        <SectionComponent>
          <ButtonComponent
            disable={isCompleted === true ? true : false}
            iconFlex="right"
            icon={
              isCompleted === true ? (
                <MaterialCommunityIcons
                  name="timer-sand-complete"
                  size={30}
                  color={appColors.white}
                />
              ) : (
                <Feather
                  name="check-circle"
                  size={30}
                  color={appColors.white}
                />
              )
            }
            onPress={handleCompleteChapter}
            text={isCompleted === true ? "You have completed" : "Complete"}
            type="primary"
          />
        </SectionComponent>
      </ScrollView>

      <LoadingLogin visible={loading} />
    </View>
  );
};

export default ChapterScreen;

const styles = StyleSheet.create({});
