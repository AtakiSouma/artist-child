import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SectionComponent from "../../../components/Global/SectionComponent";
import TextComponent from "../../../components/Global/TextComponent";
import { appColors } from "../../../constants/appColors";
import ButtonComponent from "../../../components/button/ButtonComponent";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../../redux/hook";
import {
  CurrentUser,
  loginFailure,
  loginStart,
  loginSuccessAddAuth,
} from "../../../redux/slide/authSlice";
import authenticationAPI from "../../../api/authApi";
const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState("");
  const [request, fullResult, promptAsync] = Google.useAuthRequest({
    webClientId:
      "895533199407-aji85gdf6uo7ishlr99rl38999544f1u.apps.googleusercontent.com",
    androidClientId:
      "895533199407-7od4kf9imjbm8gdmapsf71or6k3oavbp.apps.googleusercontent.com",
  });
  GoogleSignin.configure({
    webClientId:
      "1012746123965-qk2716ga174ufehp56aao1f4gs3ckc3m.apps.googleusercontent.com",
  });

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    dispatch(loginStart());
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user: CurrentUser = userInfo.user;
      const api = "/google-signin";
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        "post"
      );   
      dispatch(loginSuccessAddAuth(res.data));
       await AsyncStorage.setItem("auth", JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(loginFailure("Login Error"));
      console.log(error);
    }
  };
  return (
    <SectionComponent>
      <TextComponent
        styles={{ textAlign: "center" }}
        text="OR"
        color={appColors.gray4}
        size={16}
      />
      <ButtonComponent
        onPress={handleLoginWithGoogle}
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        icon={
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google-thumbnail.png",
            }}
            style={{ width: 30, height: 30 }}
          />
        }
        iconFlex="left"
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        icon={
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png",
            }}
            style={{ width: 30, height: 30 }}
          />
        }
        iconFlex="left"
        onPress={() => {}}
      />
    </SectionComponent>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
