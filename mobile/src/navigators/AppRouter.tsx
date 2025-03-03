import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SplashScreen } from "../screens/index";
import AuthNavigator from "./AuthNavigator";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginSuccessAddAuth } from "../redux/slide/authSlice";
import MainNavigator from "./MainNavigator";
import userApi from "../api/userApi";
import {
  getUserInfoFailure,
  getUserInfoStart,
  getUserInfoSuccessAddAuth,
} from "../redux/slide/userSlice";

const AppRouter = () => {
  const { getItem } = useAsyncStorage("auth");
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const checkLogin = async () => {
    const res = await getItem();
    if (res) {
      const parsedRes = JSON.parse(res.toString());
      dispatch(loginSuccessAddAuth(parsedRes));
    }
  };

  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  
console.log("auth" , auth)
  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) :auth.currentUser.email ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouter;

const styles = StyleSheet.create({});
