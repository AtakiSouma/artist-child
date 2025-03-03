import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CourseContent } from "../../models/course.model";
import CardComponents from "../CardComponents";
import TextComponent from "../Global/TextComponent";
import RowComponents from "../Global/RowComponents";
import { appColors } from "../../constants/appColors";
import SpaceComponent from "../Global/SpaceComponent.";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
type Props = {
  data: CourseContent;
  handleNavigation?: any;
  index: number;
  isCompleted?: boolean;
};
const ChapterCard = (props: Props) => {
  const { data, handleNavigation, index, isCompleted } = props;
  const cardBorderStyle = {
    borderWidth: 3, // Border width
    borderColor: isCompleted ? "#41B06E" : appColors.gray, // Border color based on completion status
  };
  const indexStyle = {
    color: isCompleted ? "#41B06E" : appColors.gray,
  };
  return (
    <CardComponents
      isShadow
      onPress={handleNavigation}
      styles={cardBorderStyle}
    >
      <RowComponents
        justify="space-between"
        styles={{ alignContent: "center", alignItems: "center", padding: 5 }}
      >
        <RowComponents
          justify="flex-start"
          styles={{ alignContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 43,
              fontWeight: "800",
              color: isCompleted ? "#41B06E" : appColors.gray,
            }}
          >
            0{index}
          </Text>
          <SpaceComponent width={10} />
          <TextComponent
            text={data.title}
            styles={{
              fontSize: 17,

              color: isCompleted ? "#41B06E" : appColors.gray,
            }}
          />
        </RowComponents>
        {isCompleted ? (
          <>
            <AntDesign name="checkcircle" size={30} color={"#41B06E"} />
          </>
        ) : (
          <MaterialIcons name="draw" size={30} color={appColors.primary} />
        )}
      </RowComponents>
    </CardComponents>
  );
};

export default ChapterCard;
