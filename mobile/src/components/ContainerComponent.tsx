import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "./Global/TextComponent";
import { fontFamilies } from "../constants/fontFamilies";
import RowComponents from "./Global/RowComponents";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors } from "../constants/appColors";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../style/globalStyles";
interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  right?: ReactNode;
}

const ContainerComponent = (props: Props) => {
  const { children, isScroll, isImageBackground, title, back, right } = props;
  const navigation: any = useNavigation();
  const HeaderComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        {(title || back || right) && (
          <RowComponents
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
              justifyContent: "flex-start",
            }}
          >
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginRight: 12, marginTop: 40 }}
              >
                <AntDesign name="arrowleft" size={24} color={appColors.text} />
              </TouchableOpacity>
            )}

            <View style={{ flex: 1 }}>
              {title ? (
                <TextComponent
                  text={title}
                  size={16}
                  font={fontFamilies.medium}
                  flex={1}
                />
              ) : (
                <></>
              )}
            </View>

            {right && right}
          </RowComponents>
        )}
        {returnContainer}
      </View>
    );
  };
  const returnContainer = isScroll ? (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require("../assets/images/splash-img.png")}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{HeaderComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={[
          globalStyles.container,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        {HeaderComponent()}
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;

const styles = StyleSheet.create({});
