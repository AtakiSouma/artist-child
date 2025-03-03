import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AvatarComponent from "../AvatarComponents";
import RowComponents from "../Global/RowComponents";
import TextComponent from "../Global/TextComponent";
import SpaceComponent from "../Global/SpaceComponent.";
import { appColors } from "../../constants/appColors";
type Props = {
  url: string | undefined;
  name: string | undefined;
  email: string | undefined;
};
const AvatarDetailScreen = (props: Props) => {
  const { url, name,email } = props;
  return (
    <View style={{ paddingVertical: 5, marginTop:5 }}>
      <RowComponents justify="flex-start">
        <Image
          source={{ uri: url }}
          style={{ width: 50, height: 50, borderRadius: 9999 }}
        />
        <SpaceComponent width={10}/>
        <View>
          <TextComponent text={name || "Hidden Name"} size={16}/>
          <TextComponent text={email || "Hidden Email"} color={appColors.gray} size={12} />
        </View>
      </RowComponents>
    </View>
  );
};

export default AvatarDetailScreen;

const styles = StyleSheet.create({});
