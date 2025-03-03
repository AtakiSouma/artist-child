import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { appInfo } from "../constants/appInfos";

const MenuScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <LottieView
        autoPlay
        loop
        style={{
          width: appInfo.sizes.WIDTH * 1,
          height: appInfo.sizes.HEIGHT * 1,
          backgroundColor: "transparent",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/animations/nosupport.json")}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
