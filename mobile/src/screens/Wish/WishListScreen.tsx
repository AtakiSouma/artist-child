import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import React, { useEffect, useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import CardItem from "../../components/CardItem";
import { FlatList } from "react-native-gesture-handler";
import WatchData, { WatchProps } from "../../data/watch";
import CardComponents from "../../components/CardComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardWishList from "../../components/CardWishList";
import ButtonComponent from "../../components/button/ButtonComponent";
import CircleComponent from "../../components/Global/CircleComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import TextComponent from "../../components/Global/TextComponent";
import TagComponent from "../../components/Global/TagComponent";
import { appColors } from "../../constants/appColors";
import RowComponents from "../../components/Global/RowComponents";
import Dialog from "react-native-dialog";

import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import InputComponent from "../../components/Input/InputComponents";
import SectionComponent from "../../components/SectionComponents";
import LottieView from "lottie-react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { appInfo } from "../../constants/appInfos";
import { showSuccessToast } from "../../util/toast";
const WishListScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    removeAllBookmarks();
    setVisible(false);
    showSuccessToast();
  };

  const data: WatchProps[] = WatchData;
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<WatchProps[]>([]);
  useEffect(() => {
    if (isFocused) {
      const filtered = WatchData.filter((item) => bookmarks.includes(item.id));
      setFilteredData(filtered);
    }
  }, [isFocused, bookmarks]);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch or update wishList data here
      AsyncStorage.getItem("bookmarks")
        .then((value) => {
          if (value !== null) {
            const bookmarksArray = JSON.parse(value);
            setBookmarks(bookmarksArray);
          }
        })
        .catch((error) => console.error("Error retrieving bookmarks: ", error));
    }, [])
  );

  // TODO:REmove bookmarks

  const removeAllBookmarks = async () => {
    try {
      await AsyncStorage.removeItem("bookmarks");
      setBookmarks([]);
    } catch (error) {
      console.error("Error removing bookmarks: ", error);
    }
  };

  const handleRemoveOne = async (itemId: string) => {
    try {
      const updatedBookmarks = bookmarks.filter((id) => id !== itemId);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      showToast();
    } catch (error) {
      console.error("Error updating bookmarks in AsyncStorage: ", error);
    }
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully",
      text2: "You had deleted Bookmarks!!!",
    });
  };
  return (
    <>
      <ContainerComponent isImageBackground>
        <SpaceComponent height={40} />
        <View style={{ marginHorizontal: 15 }}>
          <InputComponent
            divider
            affix={
              <AntDesign
                name="search1"
                size={24}
                style={{ fontWeight: "bold" }}
                color={appColors.primary}
              />
            }
            value=""
            onChange={() => {}}
          />
        </View>
        <SectionComponent>
          <RowComponents justify="space-between">
            <TextComponent
              styles={{ marginLeft: 15 }}
              text={`Show ${filteredData.length} ${
                filteredData.length > 1 ? "results" : "result"
              }`}
            />
            <TouchableOpacity onPress={showDialog}>
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  backgroundColor: appColors.gray,
                  borderRadius: 5,
                }}
              >
                {filteredData.length > 0 && (
                  <RowComponents justify="space-between">
                    <MaterialCommunityIcons
                      name="delete-circle-outline"
                      size={24}
                      color={appColors.white}
                    />
                    <SpaceComponent width={4} />

                    <TextComponent
                      text={"Remove All"}
                      color={appColors.white}
                    />
                  </RowComponents>
                )}
              </View>
            </TouchableOpacity>
          </RowComponents>
        </SectionComponent>

        {filteredData.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <LottieView
              autoPlay
              loop
              style={{
                width: appInfo.sizes.WIDTH * 1,
                height: appInfo.sizes.HEIGHT * 1,
                backgroundColor: "transparent",
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../../assets/animations/no.json")}
            />
          </View>
        ) : (
          <>

            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <CardComponents isShadow>
                  <RowComponents>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DetailScreen", { item })
                      }
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 120, height: 120 }}
                      />
                    </TouchableOpacity>

                    <SpaceComponent width={5} />
                    <View style={{ flex: 1 }}>
                      <TextComponent text={item.name} size={17} />
                      <TextComponent
                        text={item.type}
                        size={15}
                        color={appColors.gray}
                      />
                      <SpaceComponent height={10} />

                      <TagComponent
                        icon={
                          <MaterialIcons
                            name="auto-mode"
                            size={10}
                            color="#fff"
                          />
                        }
                        styles={{ width: "38%" }}
                        textStyles={{ fontSize: 10 }}
                        bgColor="#333333"
                        label={`${item.automatic ? "Automatic" : "Manual"} `}
                        onPress={() => {}}
                      />
                      <SpaceComponent height={20} />
                      <TextComponent
                        styles={{ marginLeft: 10 }}
                        text={`${item.price} $`}
                        size={20}
                      />
                    </View>
                  </RowComponents>
                  <View
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      top: 10,
                      right: 4,
                    }}
                  >
                    <AntDesign name="heart" size={24} color={"#eb3434"} />
                  </View>
                  <View
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      bottom: 10,
                      right: 4,
                    }}
                  >
                    <TouchableOpacity onPress={() => handleRemoveOne(item.id)}>
                      <RowComponents
                        styles={{
                          borderWidth: 0.5,
                          borderColor: appColors.gray,
                          borderRadius: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        }}
                      >
                        <AntDesign
                          name="delete"
                          size={24}
                          color={appColors.text}
                        />
                        <TextComponent text={"Remove"} />
                      </RowComponents>
                    </TouchableOpacity>
                  </View>
                </CardComponents>
              )}
            />
          </>
        )}
      </ContainerComponent>
      <Dialog.Container
        headerStyle={{ backgroundColor: "#ffffff" }}
        visible={visible}
        onBackdropPress={handleCancel}
      >
        <Dialog.Title>
          <RowComponents>
            <FontAwesome5
              name="heart-broken"
              size={24}
              color={appColors.danger}
            />
            <SpaceComponent width={8} />
            <TextComponent text={"Delete All Watches"} title />
            <SpaceComponent height={20} />
          </RowComponents>
        </Dialog.Title>
        <Dialog.Description>
          <Text>
            Do you want to delete all items watch in wishlist? You cannot undo
            this action.
          </Text>
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          style={{ fontWeight: "500" }}
          color={appColors.gray}
          onPress={handleCancel}
        />
        <Dialog.Button
          label="Delete"
          style={{
            fontWeight: "500",
            paddingVertical: 3,
            paddingHorizontal: 7,
            backgroundColor: appColors.primary,
            borderRadius: 5,
          }}
          color={appColors.white}
          onPress={handleDelete}
        />
      </Dialog.Container>
    </>
  );
};

export default WishListScreen;
