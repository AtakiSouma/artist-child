import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { appInfo } from "../constants/appInfos";
import ButtonComponent from "../components/button/ButtonComponent";

const BuySuccessScreen = ({navigation}:any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        loop
        style={{
          marginTop: 0,
          width: appInfo.sizes.WIDTH * 1,
          height: appInfo.sizes.HEIGHT * 0.8,
          backgroundColor: "transparent",
        }}
        source={require("../assets/animations/Sucess.json")}
      />
      <ButtonComponent
      
      onPress={() => navigation.navigate("Explore")}
      type="primary" text="Go Home for continue Shopping" />
    </View>
  );
};

export default BuySuccessScreen;

const styles = StyleSheet.create({});
