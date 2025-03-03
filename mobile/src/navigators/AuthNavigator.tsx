import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import { useAppSelector } from "../redux/hook";
import OnBoardingComponent from "../components/OnBoardingComponent";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const auth = useAppSelector((state) => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
