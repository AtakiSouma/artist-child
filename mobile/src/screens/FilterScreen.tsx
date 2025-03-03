import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import RowComponents from "../components/Global/RowComponents";
import TextComponent from "../components/Global/TextComponent";
import WatchData, { WatchProps } from "../data/watch";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import TagComponent from "../components/Global/TagComponent";
import { appInfo } from "../constants/appInfos";
import CardComponents from "../components/CardComponents";
import { appColors } from "../constants/appColors";
import TagImageComponent from "../components/TagImageComponents";
import CardItem from "../components/CardItem";
import SpaceComponent from "../components/Global/SpaceComponent.";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import SectionComponent from "../components/SectionComponents";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import CircleComponent from "../components/Global/CircleComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FilterScreen = ({ navigation }: any) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  useEffect(() => {
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        if (value !== null) {
          const bookmarksArray = JSON.parse(value);
          setBookmarks(bookmarksArray);
        }
      })
      .catch((error) => console.error("Error retrieving bookmarks: ", error));
  }, [bookmarks]);

  const defaultColor = appColors.text;
  const borderColor = appColors.white;
  const selectedColor = appColors.primary; // Change this to the desired selected color
  const [brandsData, setBrandsData] = useState([
    {
      id: "0",
      name: "All watches",
      icon: <FontAwesome6 name="list-check" size={20} color={defaultColor} />,
      color: defaultColor,
      borderColor: borderColor,
    },
    {
      id: "1",
      name: "Rolex",
      icon: <MaterialIcons name="watch" size={24} color={defaultColor} />,
      color: defaultColor,
      borderColor: borderColor,
    },
    {
      id: "2",
      name: "Omega",
      icon: (
        <MaterialCommunityIcons name="omega" size={30} color={defaultColor} />
      ),
      color: defaultColor,
      borderColor: borderColor,
    },
    {
      id: "3",
      name: "IWC",
      icon: <Feather name="watch" size={24} color={defaultColor} />,
      color: defaultColor,
      borderColor: borderColor,
    },
    {
      id: "4",
      name: "Seiko",
      icon: (
        <MaterialCommunityIcons
          name="watch-variant"
          size={24}
          color={defaultColor}
        />
      ),
      color: defaultColor,
      borderColor: borderColor,
    },
    {
      id: "5",
      name: "Smart",
      icon: <Ionicons name="watch" size={26} color={defaultColor} />,
      color: defaultColor,
      borderColor: borderColor,
    },
  ]);
  const data: WatchProps[] = WatchData;
  const [filteredData, setFilteredData] = useState<WatchProps[]>(WatchData);
  const handleFilter = (id: string) => {
    if (id === "0") {
      setFilteredData(WatchData);
      setBrandsData((prevBrandsData) =>
        prevBrandsData.map((brand) => ({
          ...brand,
          borderColor: borderColor,
          color: defaultColor,
          icon: React.cloneElement(brand.icon, { color: defaultColor }),
        }))
      );
    } else {
      setBrandsData((prevBrandsData) =>
        prevBrandsData.map((brand) => {
          if (brand.id === id) {
            return {
              ...brand,
              borderColor: selectedColor,
              color: selectedColor,
              icon: React.cloneElement(brand.icon, { color: selectedColor }),
            };
          } else {
            return {
              ...brand,
              borderColor: borderColor,
              color: defaultColor,
              icon: React.cloneElement(brand.icon, { color: defaultColor }),
            };
          }
        })
      );

      const filtered = WatchData.filter(
        (item) =>
          item.brand === brandsData.find((brand) => brand.id === id)?.name
      );
      setFilteredData(filtered);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: 40 }}>
        <RowComponents
          justify="space-between"
          styles={{ marginHorizontal: 20 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
            <AntDesign name="arrowleft" size={30} color={appColors.text} />
          </TouchableOpacity>
          <TextComponent title text="Find Watch by Brand" />
        </RowComponents>
        <SpaceComponent height={20} />
        <RowComponents styles={{ paddingHorizontal: 10, zIndex: 1 }}>
          <FlatList
            data={brandsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TagComponent
                styles={{ borderColor: item.borderColor, borderWidth: 2 }}
                label={item.name}
                onPress={() => handleFilter(item.id)}
                icon={item.icon}
                textColor={item.color}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </RowComponents>
        <SpaceComponent height={10} />

        <TextComponent
          styles={{ marginLeft: 15 }}
          text={`Show ${filteredData.length} ${
            filteredData.length > 1 ? "results" : "result"
          }`}
        />
        <SpaceComponent height={20} />
        {filteredData.length === 0 ? (
          <>
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                loop
                style={{
                  marginTop: 550,
                  width: appInfo.sizes.WIDTH * 1,
                  height: appInfo.sizes.HEIGHT * 1,
                  backgroundColor: "transparent",
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../assets/animations/Animation - 1713247547029.json")}
              />
            </View>
          </>
        ) : (
          <View style={{paddingBottom:500}}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              data={filteredData}
              renderItem={({ item }) => {
                const isBookmarked = bookmarks.includes(item.id.toString());
                return (
                  <CardComponents
                    isShadow
                    onPress={() =>
                      navigation.navigate("DetailScreen", { item })
                    }
                  >
                    <RowComponents>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 120, height: 120 }}
                      />
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
                    <CircleComponent
                      color="#ffffff"
                      styles={{
                        borderWidth: 0.5,
                        borderColor: "#333",
                        zIndex: 1,
                        position: "absolute",
                        top: 100,
                        right: 10,
                      }}
                    >
                      <AntDesign
                        name="heart"
                        size={24}
                        color={isBookmarked ? "#eb3434" : "#1c1919"}
                      />
                    </CircleComponent>
                  </CardComponents>
                );
              }}
            />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
