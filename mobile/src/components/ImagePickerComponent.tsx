import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { appInfo } from "../constants/appInfos";
import { appColors } from "../constants/appColors";
import * as ImagePicker from "expo-image-picker";
import TextComponent from "./Global/TextComponent";
import InputComponent from "./Input/InputComponents";
import SectionComponent from "./SectionComponents";
import SpaceComponent from "./Global/SpaceComponent.";
import ButtonComponent from "./button/ButtonComponent";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import RowComponents from "./Global/RowComponents";
type Props = {
  image: string;
  resultMessage: string;
  setResultMessage: (resultMessage: string) => void;
  setImage: (image: string) => void;
  pickImage: any;
  handleOnSubmit: any;
};
const ImagePickerComponent = (props: Props) => {
  const {
    image,
    setImage,
    pickImage,
    resultMessage,
    setResultMessage,
    handleOnSubmit,
  } = props;

  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: "#fff",
        shadowColor: "#333",
        borderRadius: 20,
        paddingVertical: 10,
      }}
    >
      <SectionComponent>
        <TextComponent
          text={"Pick your image"}
          color={appColors.primary}
          size={20}
        />
        <SpaceComponent height={10} />

        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: appInfo.sizes.WIDTH * 0.85,
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: appColors.button,
            height: 230,
          }}
        >
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.image} />
            </>
          ) : (
            <Ionicons name="image" size={100} color={appColors.primary} />
          )}
        </View>

        <SpaceComponent height={10} />
        <RowComponents justify="flex-end">
          <ButtonComponent
            text="Upload"
            onPress={pickImage}
            type="primary"
            iconFlex="right"
            styles={{ width: 130 }}
            icon={<Feather name="upload" size={24} color={appColors.white} />}
          />
        </RowComponents>
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          text={"Your question"}
          color={appColors.primary}
          size={20}
        />
        <SpaceComponent height={10} />
        <InputComponent
          onChange={(val) => setResultMessage(val)}
          value={resultMessage}
          numberOfLine={3}
          allowClear
          multiline
          placeholder="Input detailed and clear......"
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          onPress={handleOnSubmit}
          text="Submit"
          type="primary"
          iconFlex="right"
          icon={<FontAwesome name="send" size={24} color={appColors.white} />}
        />
      </SectionComponent>
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 200,
  },
});
