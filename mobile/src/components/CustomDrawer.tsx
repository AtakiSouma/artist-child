import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { appColors } from "../constants/appColors";
import {
  FontAwesome6,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAuth } from "../redux/slide/authSlice";
import { StatusBar } from "expo-status-bar";
import AvatarComponent from "./AvatarComponents";
import { FlatList } from "react-native-gesture-handler";
import RowComponents from "./Global/RowComponents";
import TextComponent from "./Global/TextComponent";
import ButtonComponent from "./button/ButtonComponent";
const CustomDrawer = ({ navigation }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const size = 22;
  const color = appColors.gray;
  const dispatch = useAppDispatch();
  const handleLogoutAsync = async () => {
    await AsyncStorage.removeItem("auth");
    await GoogleSignin.signOut();

    dispatch(removeAuth());
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("auth");
    await GoogleSignin.signOut();
    dispatch(removeAuth());
  };
  if (!auth.currentUser.photo) {
    return <></>;
  }
  const profileMenu = [
    {
      key: "MyProfile",
      title: "My Profile",
      icon: <FontAwesome6 name="clipboard-user" size={size} color={color} />,
    },
    {
      key: "CreditCard",
      title: "Credit Card",
      icon: <Entypo name="credit-card" size={size} color={color} />,
    },
    {
      key: "Bookmark",
      title: "Bookmark",
      icon: <FontAwesome name="bookmark" size={size} color={color} />,
    },
    {
      key: "ContactUs",
      title: "Contact Us",
      icon: <MaterialIcons name="textsms" size={size} color={color} />,
    },
    {
      key: "Settings",
      title: "Settings",
      icon: <Ionicons name="settings-sharp" size={size} color={color} />,
    },
    {
      key: "HelpAndFAQs",
      title: "Help & FAQs",
      icon: (
        <MaterialCommunityIcons
          name="message-alert"
          size={size}
          color={color}
        />
      ),
    },
    {
      key: "SignOut",
      title: "Sign Out",
      icon: <MaterialIcons name="logout" size={size} color={color} />,
    },
  ];
  const handleNavigation = (key: string) => {
    switch (key) {
      case "SignOut":
        handleLogout();
        break;

      case "MyProfile":
        navigation.navigate("Profile", {
          screen: "Profile",
          params: {
            id: auth.currentUser.id,
          },
        });
      default:
        break;
    }
    navigation.closeDrawer();
  };
  return (
    <View style={[localStyles.container]}>
      <AvatarComponent
        styles={localStyles.avatar}
        onPress={() => handleNavigation("Profile")}
        photoURL={auth.currentUser.photo}
        name={auth.currentUser.name ? auth.currentUser.name : "No name"}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{ flex: 1, marginVertical: 25 }}
        renderItem={({ item }) => (
          <RowComponents
            styles={[localStyles.listItem]}
            onPress={() => handleNavigation(item.key)}
          >
            {item.icon}
            <TextComponent
              text={item.title}
              styles={localStyles.listItemText}
              color={appColors.text}
            />
          </RowComponents>
        )}
      />
      <RowComponents justify="flex-start">
        <ButtonComponent text="logout" onPress={() => handleLogoutAsync()} />
      </RowComponents>
    </View>
  );
};

export default CustomDrawer;
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 48,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: "flex-start",
  },

  listItemText: {
    paddingLeft: 12,
    fontSize: 17,
  },
});
