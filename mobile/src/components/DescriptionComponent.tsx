import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import React, { useState } from "react";
import TextComponent from "./Global/TextComponent";

import { appColors } from "../constants/appColors";
type Props = {
  description: string;
};
const DescriptionComponent = (props: Props) => {
  const { description } = props;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const truncatedDescription =
    description.length > 200 ? `${description.slice(0, 200)}...` : description;
  return (
    <View style={{ marginLeft:5}}>
      <Text>{showFullDescription ? description : truncatedDescription}</Text>
      {description.length > 100 && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={{ color: appColors.primary }}>
            {showFullDescription ? "View less" : "View more"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DescriptionComponent;

const styles = StyleSheet.create({});
