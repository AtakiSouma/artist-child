import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import CustomDrawer from "../components/CustomDrawer";
import FilterScreen from "../screens/FilterScreen";
import DetailsScreen from "../screens/DetailsScreen";
import DetailCourseScreen from "../screens/DetailCourseScreen";
import ChapterScreen from "../screens/ChapterScreen";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="DetailCourseScreen" component={DetailCourseScreen} />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
