import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import InstructorData, { InstructorProps } from "../data/instructos";
import CardComponents from "./CardComponents";
import { appColors } from "../constants/appColors";
import { appInfo } from "../constants/appInfos";
import TextComponent from "./Global/TextComponent";
type Props = {
  instructor: InstructorProps;
};
const InstructorsCard = (props: Props) => {
  const { instructor } = props;
  return (
    <View style={{ width: appInfo.sizes.WIDTH * 0.7 , marginLeft:20 }}>
      <ImageBackground
        source={{ uri: instructor.image }}
        style={{ flex: 1, marginBottom: 12, height: 150, padding: 10 ,borderRadius:10 }}
      />

      <TextComponent text={instructor.name} />
    </View>
  );
};

export default InstructorsCard;

const styles = StyleSheet.create({});
