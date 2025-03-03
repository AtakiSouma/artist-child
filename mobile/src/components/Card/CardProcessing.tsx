import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Course } from "../../models/course.model";
import { useNavigation } from "@react-navigation/native";
import CardComponents from "../CardComponents";
import { appColors } from "../../constants/appColors";
import { appInfo } from "../../constants/appInfos";
import RowComponents from "../Global/RowComponents";
import { globalStyles } from "../../style/globalStyles";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";
import TextComponent from "../Global/TextComponent";
import SpaceComponent from "../Global/SpaceComponent.";
import * as Progress from "react-native-progress";

interface Props {
  item: Course;
  //   item: any;
  type?: "card" | "list";
  isList?: boolean;
  isBookmarked?: boolean;
  setIsBookmarked?: (value: boolean) => void;
  handleToggleBookMark?: any;
}
const CardProcessing = (props: Props) => {
  const navigation: any = useNavigation();
  const {
    item,
    type,
    isList,
    handleToggleBookMark,
    isBookmarked,
    setIsBookmarked,
  } = props;
  return (
    <CardComponents
      isShadow
      color={appColors.white2}
      styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
      onPress={() => navigation.navigate("CourseDetailScreenBought", { item })}
    >
      <ImageBackground
        style={{ flex: 1, marginBottom: 12, height: 131, padding: 5 }}
        source={{
          uri: item.thumbnail.url,
        }}
        imageStyle={{
          padding: 10,
          resizeMode: "cover",
          borderRadius: 7,
        }}
      >
        <RowComponents justify="flex-end">
          <CardComponents
            styles={[globalStyles.noSpaceCard]}
            color="#ffffffA1"
            onPress={() => handleToggleBookMark(item._id)}
          >
            {isBookmarked ? (
              <FontAwesome
                name="bookmark"
                size={30}
                color={appColors.danger2}
              />
            ) : (
              <FontAwesome name="bookmark" size={28} color={appColors.white} />
            )}
          </CardComponents>
        </RowComponents>
      </ImageBackground>
      <View style={{ marginLeft: 5 }}>
        <TextComponent numOfLine={1} text={item.name} title size={18} />
        <TextComponent
          numOfLine={1}
          text={item.categories.title}
          size={12}
          color={appColors.gray}
        />
        <SpaceComponent height={5} />
        <RowComponents justify="space-between">
          <RowComponents justify="flex-start">
            <View
              style={{
                backgroundColor: "#E3FEF7",
                paddingVertical: 2,
                paddingHorizontal: 4,
                borderRadius: 5,
              }}
            >
              <Feather name="book-open" size={20} color={appColors.primary} />
            </View>

            <SpaceComponent width={3} />
            <TextComponent
              text={item.courseContentData.length}
              color={appColors.gray}
            />
            <SpaceComponent width={3} />

            <TextComponent text={"Chapter"} size={13} color={appColors.gray} />
          </RowComponents>
        </RowComponents>
        <View style={{ marginTop: 2, marginLeft: 2 }}>
          <Progress.Bar
            progress={0}
            width={250}
            borderColor={appColors.buttonSecondary}
            color={appColors.primary}
          />
        </View>
      </View>
    </CardComponents>
  );
};

export default CardProcessing;

const styles = StyleSheet.create({
  iconBook: {
    backgroundColor: "#E3FEF7",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
});
