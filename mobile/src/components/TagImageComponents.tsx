import React, { ReactNode } from "react";
import {
  ImageBackground,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../style/globalStyles";
import { appColors } from "../constants/appColors";
import TextComponent from "./Global/TextComponent";

interface Props {
  onPress: () => void;
  label?: string;
  icon?: ReactNode;
  imageUrl: string;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const TagImageComponent = (props: Props) => {
  const {
    onPress,
    label,
    icon,
    textColor,
    bgColor,
    styles,
    textStyles,
    imageUrl,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ? bgColor : appColors.white,
        },
        styles,
      ]}
    >
      <View
        style={{
          width: 51,
          height: 51,
          borderWidth: 1,
          borderColor: appColors.gray,
        }}
      >
        <ImageBackground
          source={{ uri: imageUrl }}
          style={{ width: 50, height: 50 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TagImageComponent;
