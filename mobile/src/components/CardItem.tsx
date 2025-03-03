import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CardComponents from "./CardComponents";
import { appColors } from "../constants/appColors";
import { appInfo } from "../constants/appInfos";
import { WatchProps } from "../data/watch";
import { useNavigation } from "@react-navigation/native";
import RowComponents from "./Global/RowComponents";
import { globalStyles } from "../style/globalStyles";
import TextComponent from "./Global/TextComponent";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import SpaceComponent from "./Global/SpaceComponent.";
import CircleComponent from "./Global/CircleComponent";
interface Props {
  item: WatchProps;
  //   item: any;
  type: "card" | "list";
  isList?: boolean;
  isBookmarked?: boolean;
  setIsBookmarked?: (value: boolean) => void;
  handleToggleBookMark?: any;
}
import Toast from "react-native-toast-message";
import ButtonComponent from "./button/ButtonComponent";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toggleBookmark } from "../redux/slide/addWish";

const CardItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.bookmark);

  const {
    item,
    type,
    isList,
    handleToggleBookMark,
    isBookmarked,
    setIsBookmarked,
  } = props;
  const navigation: any = useNavigation();
  // Fetch bookmarks when item.id changes  // const [bookmarkChecking, setIsBookmarkedChecking] = useState<string | null>(
  //   ""
  // );
  // useEffect(() => {
  //   const checkIfBookmarked = async () => {
  //     const bookmarksString = await AsyncStorage.getItem("bookmarks");
  //     const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  //     const isItemBookmarked = bookmarks.includes(item.id);
  //     setIsBookmarked(isItemBookmarked);
  //   };
  //   checkIfBookmarked();
  // }, [item.id, setIsBookmarked]);

  // const toggleBookmark = async () => {
  //   try {
  //     const bookmarksString = await AsyncStorage.getItem("bookmarks");
  //     let bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  //     const index = bookmarks.findIndex((id: string) => id === item.id);
  //     if (index === -1) {
  //       bookmarks.push(item.id);
  //       setIsBookmarked(true);
  //     } else {
  //       bookmarks.splice(index, 1);
  //       setIsBookmarked(false);
  //     }
  //     console.log("Updated bookmarks:", bookmarks);
  //     await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //   } catch (error) {
  //     console.error("Error toggling bookmark:", error);
  //   }
  // };
  return (
    <>
      {isList ? (
        <>
          <CardComponents
            onPress={() => navigation.navigate("DetailScreen", { item })}
            isShadow
            color={appColors.white2}
            styles={{ width: appInfo.sizes.WIDTH * 0.9 }}
          >
            <RowComponents justify="space-between">
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                }}
                resizeMode="contain"
              />
              <View>
                <TextComponent text={item.name} styles={{ fontSize: 20 }} />
                <TextComponent text={item.type} styles={{ fontSize: 20 }} />
              </View>
            </RowComponents>
          </CardComponents>
        </>
      ) : (
        <CardComponents
          isShadow
          color={appColors.white2}
          styles={{ width: appInfo.sizes.WIDTH * 0.6 }}
          onPress={() => navigation.navigate("DetailScreen", { item })}
        >
          <ImageBackground
            style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
            source={{
              uri: item.image,
            }}
            imageStyle={{
              padding: 10,
              resizeMode: "cover",
              borderRadius: 12,
            }}
          >
            <RowComponents justify="space-between">
              <CardComponents
                styles={globalStyles.noSpaceCard}
                color="#ffffffB3"
              >
                <RowComponents>
                  <TextComponent text="5" />
                  <AntDesign name="star" size={24} color="yellow" />
                </RowComponents>
              </CardComponents>
              <CardComponents
                styles={[globalStyles.noSpaceCard]}
                color="#ffffffB3"
                onPress={() => handleToggleBookMark(item.id)}
              >
                {isBookmarked ? (
                  <AntDesign name="heart" size={22} color={appColors.danger2} />
                ) : (
                  <AntDesign name="hearto" size={24} color="black" />
                )}
              </CardComponents>
            </RowComponents>
            {/* <TextComponent text="concert spakle" /> */}
          </ImageBackground>
          <TextComponent numOfLine={1} text={item.name} title size={18} />
          <RowComponents>
            <TextComponent
              flex={1}
              numOfLine={1}
              text={item.type}
              size={12}
              color={appColors.text2}
            />
          </RowComponents>
        </CardComponents>
      )}
    </>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
