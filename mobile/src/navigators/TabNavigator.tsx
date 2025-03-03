import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { appColors } from "../constants/appColors";
import {
  MaterialIcons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CircleComponent from "../components/Global/CircleComponent";
import { globalStyles } from "../style/globalStyles";
import TextComponent from "../components/Global/TextComponent";
import HomeScreen from "../screens/Home/HomeScreen";
import {
  CartScreen,
  MenuScreen,
  ProfileScreen,
  WishListScreen,
} from "../screens";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 68,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appColors.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray;
          size = 25;
          switch (route.name) {
            case "Explore":
              icon = <MaterialIcons name="home" size={30} color={color} />;
              break;
            case "Wishlist":
              icon = <FontAwesome name="heart" size={size} color={color} />;
              break;
            case "Order":
              icon = <FontAwesome5 name="shopping-cart" size={size} color={color} />;
              break;
            case "Profile":
              icon = <FontAwesome name="user" size={size} color={color} />;
              break;
            case "Menu":
              icon = (
                <CircleComponent
                  size={60}
                  styles={[globalStyles.shadow, { marginTop: -67 }]}
                >
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    size={30}
                    color={appColors.white}
                  />
                </CircleComponent>
              );
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabelPosition: "below-icon",
        tabBarLabel({ focused }) {
          return route.name === "Menu" ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray5}
              styles={{
                marginBottom: 12,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishListScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Order" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({});
