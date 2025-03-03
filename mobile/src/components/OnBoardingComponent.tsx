import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { appInfo } from "../constants/appInfos";
import { globalStyles } from "../style/globalStyles";
import { appColors } from "../constants/appColors";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import TextComponent from "./Global/TextComponent";

const OnBoardingComponent = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: "red" }}>
        <Text>Hello</Text>
        <Swiper
          style={{}}
          loop={false}
          onIndexChanged={(num) => setIndex(num)}
          index={index}
          activeDotColor={appColors.white}
        >
          <Image
            source={{
              uri: "https://c0.wallpaperflare.com/preview/670/54/348/table-watch-phone-plant.jpg",
            }}
            style={styles.ImageStyle}
          />
          <Image
            source={{
              uri: "https://i.etsystatic.com/22262142/r/il/19f12a/3268243474/il_570xN.3268243474_f0tz.jpg",
            }}
            style={styles.ImageStyle}
          />
          <Image
            source={{
              uri: "https://i.etsystatic.com/11880230/r/il/df5fa9/2699622814/il_fullxfull.2699622814_cdp1.jpg",
            }}
            style={styles.ImageStyle}
          />
        </Swiper>

        <View style={[styles.paginationStyle]}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <TextComponent text="Skip" color={appColors.gray2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              index < 2 ? setIndex(index + 1) : navigation.navigate("Login")
            }
          >
            <TextComponent text="Next" color={appColors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default OnBoardingComponent;

const styles = StyleSheet.create({
  ImageStyle: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: "cover",
  },
  paginationStyle: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
