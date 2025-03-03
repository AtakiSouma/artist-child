import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import FilterScreen from "../screens/FilterScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BuySuccessScreen from "../screens/BuySuccessScreen";
import DetailCourseScreen from "../screens/DetailCourseScreen";
import ChapterScreen from "../screens/ChapterScreen";
import CourseDetailBought from "../screens/CourseDetailBought";
import FilterCourseScreen from "../screens/FilterCourseScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      {/* <Stack.Screen name="FilterScreen" component={FilterScreen} /> */}
      {/* <Stack.Screen name="DetailScreen" component={DetailsScreen} /> */}
      <Stack.Screen name="FilterCourseScreen" component={FilterCourseScreen} />
      <Stack.Screen name="SuccessScreen" component={BuySuccessScreen} />
      <Stack.Screen name="DetailCourseScreen" component={DetailCourseScreen} />
      <Stack.Screen name="ChapterScreen" component={ChapterScreen} />
      <Stack.Screen name="CourseDetailScreenBought" component={CourseDetailBought} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
