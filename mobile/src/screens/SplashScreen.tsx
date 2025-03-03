import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { appInfo } from "../constants/appInfos";
import { appColors } from "../constants/appColors";
import { Svg } from "react-native-svg";
const image = {
  uri: "https://docs.expo.dev/static/images/tutorial/splash.png",
};

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
      source={{uri:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i2nEtFZqb01I/v0/-1x-1.jpg"}}
      style={{
        width:410,
        height:410

      }}
      resizeMethod="auto"
      resizeMode="cover"
      />
      <ActivityIndicator color={appColors.primary} size={80} animating={true} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor:"#fff",
    marginBottom:300,
  },
});
