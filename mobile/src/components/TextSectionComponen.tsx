import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import TextComponent from "./Global/TextComponent";
import RowComponents from "./Global/RowComponents";
import SpaceComponent from "./Global/SpaceComponent.";
type Props = {
  title: string;
  icon: ReactNode;
};
const TextSectionComponent = (props: Props) => {
  const { title, icon } = props;
  return (
    <RowComponents
      justify="flex-start"
      styles={{
        padding: 2,
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <TextComponent title text={title} />
      <SpaceComponent width={10} />
      {icon && icon}
    </RowComponents>
  );
};

export default TextSectionComponent;

const styles = StyleSheet.create({});
