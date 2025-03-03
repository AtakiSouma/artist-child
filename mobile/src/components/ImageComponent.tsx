import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SectionComponent from "./SectionComponents";
type Props = {
  url: string;
  stylesImage: StyleProp<ImageStyle>;
};
const ImageComponent = (props: Props) => {
  const { url, stylesImage } = props;
  return (
    <SectionComponent>
      <Image
        source={{ uri: url }}
        style={
          (stylesImage)
        }
      />
    </SectionComponent>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({});
