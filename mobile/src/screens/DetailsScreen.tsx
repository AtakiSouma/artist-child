import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { WatchProps, calculateAverageRate, feedBackData } from "../data/watch";
import { LinearGradient } from "expo-linear-gradient";
import RowComponents from "../components/Global/RowComponents";
import { appColors } from "../constants/appColors";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import TextComponent from "../components/Global/TextComponent";
import CardComponents from "../components/CardComponents";
import { globalStyles } from "../style/globalStyles";
import SectionComponent from "../components/SectionComponents";
import { appInfo } from "../constants/appInfos";
import SpaceComponent from "../components/Global/SpaceComponent.";
import CircleComponent from "../components/Global/CircleComponent";
import ButtonComponent from "../components/button/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showInfoToast, showSuccessToast } from "../util/toast";
import { SizeItem } from "../util/sizeItem";
import { Entypo } from "@expo/vector-icons";
const formatDate = (timeComment: any) => {
  // error function

  // error function
  const commentDate = new Date(timeComment);
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  return commentDate.toLocaleDateString("en-US", options);
};
const DetailsScreen = ({ route, navigation }: any) => {
  // TODO: handle get wish
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if the current item is bookmarked when the component mounts
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        if (value !== null) {
          const bookmarksArray = JSON.parse(value);
          setIsBookmarked(bookmarksArray.includes(item.id.toString()));
        }
      })
      .catch((error) => console.error("Error retrieving bookmarks: ", error));
  }, []);

  //TODO: Function to toggle bookmark status
  const toggleBookmark = () => {
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        let bookmarksArray = [];
        if (value !== null) {
          bookmarksArray = JSON.parse(value);
        }
        const updatedBookmarks = isBookmarked
          ? bookmarksArray.filter(
              (bookmarkId: any) => bookmarkId !== item.id.toString()
            )
          : [...bookmarksArray, item.id.toString()];
        AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
          .then(() => {
            setIsBookmarked(!isBookmarked);
            if (isBookmarked === false) {
              showSuccessToast();
            } else {
              showInfoToast();
            }
          })
          .catch((error) =>
            console.error("Error updating bookmarks in AsyncStorage: ", error)
          );
      })
      .catch((error) => console.error("Error retrieving bookmarks: ", error));
  };
  // END:

  const { item }: { item: WatchProps } = route.params;
  const { feedbacks }: { feedbacks: feedBackData[] } = item;

  // TODO:Caculate rate average
  const averageRates = calculateAverageRate(feedbacks);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription =
    item.description.length > 200
      ? `${item.description.slice(0, 200)}...`
      : item.description;
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // Calculate the average rate from the feedbacks array
  const averageRate = () => {
    if (!item.feedbacks || item.feedbacks.length === 0) {
      return 0;
    }
    const sumRates = item.feedbacks.reduce(
      (acc, feedback) => acc + feedback.rate,
      0
    );
    console.log(sumRates / item.feedbacks.length);
    return sumRates / item.feedbacks.length;
  };
  const renderStars = () => {
    const rate = averageRate();
    const fullStars = Math.floor(rate);
    const fractionalPart = rate - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={i} name="star" size={24} color="yellow" />);
    }

    if (fractionalPart >= 0.25 && fractionalPart < 0.9) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-full"
          size={24}
          color="yellow"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rate);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AntDesign key={`empty${i}`} name="staro" size={24} color="yellow" />
      );
    }

    return (
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {stars}
        <Text>~({item.feedbacks.length} Reviews)</Text>
      </View>
    );
  };
  // TODO:render AvareStart
  const renderAverageStars = () => {
    const rate = averageRate();
    const fullStars = Math.floor(rate);
    const fractionalPart = rate - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={i} name="star" size={24} color="yellow" />);
    }

    if (fractionalPart >= 0.25 && fractionalPart < 0.9) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-full"
          size={24}
          color="yellow"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rate);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AntDesign key={`empty${i}`} name="staro" size={24} color="yellow" />
      );
    }

    return (
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <RowComponents>{stars}</RowComponents>
        <Text
          style={{
            fontSize: 18,
            color: appColors.gray,
          }}
        >
          {item.feedbacks.length} of Reviews
        </Text>
      </View>
    );
  };
  const calculateRateCount = (rate: number) => {
    return feedbacks.filter((feedback) => feedback.rate === rate).length;
  };

  const renderStarsAloneWithNotIndex = (rate: number) => {
    const fullStars = Math.floor(rate);
    const fractionalPart = rate - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={i} name="star" size={18} color="yellow" />);
    }

    if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-full"
          size={24}
          color="yellow"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rate);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AntDesign key={`empty${i}`} name="staro" size={18} color="yellow" />
      );
    }

    return (
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {stars}
        </View>
      </TouchableOpacity>
    );
  };

  const flatListRef = React.useRef<FlatList<feedBackData>>(null);
  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
  };
  const renderStarsAlone = (rate: number, index: number) => {
    const fullStars = Math.floor(rate);
    const fractionalPart = rate - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={i} name="star" size={18} color="yellow" />);
    }

    if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-full"
          size={24}
          color="yellow"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rate);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AntDesign key={`empty${i}`} name="staro" size={18} color="yellow" />
      );
    }
    const handlePress = () => {
      const nextIndex = sortedFeedbacks.findIndex(
        (item, idx) => idx > index && item.rate === rate
      );
      console.log("nextIndex", nextIndex);
      if (nextIndex !== -1) {
        scrollToIndex(nextIndex);
      }
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {stars}
        </View>
      </TouchableOpacity>
    );
  };

  // Create a map to store the rates and corresponding user IDs
  const rateMap = new Map<number, string[]>();
  feedbacks.forEach((feedback) => {
    if (rateMap.has(feedback.rate)) {
      rateMap.get(feedback.rate)?.push(feedback.id);
    } else {
      rateMap.set(feedback.rate, [feedback.id]);
    }
  });

  // Render the rates and their occurrences
  const renderedRates = Array.from(rateMap.entries()).map(([rate, ids]) => (
    <Text key={rate} style={{}}>
      {renderStarsAloneWithNotIndex(rate)} {ids.length}
    </Text>
  ));
  console.log(feedbacks);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size: any) => {
    setSelectedSize(size);
    Alert.alert(String(size)); // You can customize this action as needed
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedSize === item.size;

    return (
      <TouchableOpacity onPress={() => handleSizeSelect(item.size)}>
        <View style={{ marginRight: 20 }}>
          <CircleComponent
            size={50}
            color={isSelected ? appColors.primary : appColors.gray} // Change color when selected
          >
            <Text style={{ color: appColors.white }}>{item.size}</Text>
          </CircleComponent>
        </View>
      </TouchableOpacity>
    );
  };
  // Sort the feedbacks array by timeComment (newest first)
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    const dateA = new Date(a.timeComment).getTime();
    const dateB = new Date(b.timeComment).getTime();
    return dateB - dateA;
  });

  // TODO:handle modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <GestureHandlerRootView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: "#f2f2f2" }}>
          <Image
            source={{ uri: item.image }}
            style={{
              zIndex: -1,
              height: 300,
              width: appInfo.sizes.WIDTH * 1,
            }}
          />
          <RowComponents
            justify="space-between"
            styles={{
              paddingHorizontal: 10,
              alignItems: "flex-end",
              bottom: 290,
              left: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 48,
                height: 48,
                justifyContent: "center",
              }}
            >
              <AntDesign name="arrowleft" size={34} color={appColors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleBookmark()}
              style={{
                width: 48,
                height: 48,
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="heart"
                size={34}
                color={isBookmarked ? "#eb3434" : "#1c1919"}
              />
            </TouchableOpacity>
          </RowComponents>
        </View>
        <View
          style={{
            backgroundColor: appColors.white,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}
        >
          <SectionComponent styles={{ marginTop: 30 }}>
            <TextComponent
              title
              size={26}
              styles={{ fontWeight: "bold" }}
              text={item.name}
              color={appColors.text}
            />
            <RowComponents styles={{ marginRight: 20, marginTop: 10 }}>
              <CardComponents
                styles={[globalStyles.noSpaceCard, { width: 48, height: 48 }]}
                color={`${appColors.primary}4D`}
              >
                <Ionicons
                  variant="Bold"
                  color={appColors.primary}
                  size={24}
                  name="watch"
                />
              </CardComponents>
              <SpaceComponent width={16} />
              <View
                style={{
                  flex: 1,
                  height: 48,
                  justifyContent: "space-around",
                }}
              >
                <TextComponent
                  text={item.brand}
                  size={18}
                  color={appColors.gray}
                />
              </View>
            </RowComponents>
            <SpaceComponent height={6} />

            <RowComponents styles={{ marginRight: 20 }}>
              <CardComponents
                styles={[globalStyles.noSpaceCard, { width: 48, height: 48 }]}
                color={`${appColors.primary}4D`}
              >
                <MaterialIcons
                  variant="Bold"
                  color={appColors.primary}
                  size={24}
                  name="category"
                />
              </CardComponents>
              <SpaceComponent width={16} />
              <View
                style={{
                  flex: 1,
                  height: 48,
                  justifyContent: "space-around",
                }}
              >
                <TextComponent
                  text={item.type}
                  size={18}
                  color={appColors.gray}
                />
              </View>
            </RowComponents>

            {renderStars()}
          </SectionComponent>
          <SectionComponent>
            <TextComponent text="Size" title />
            <FlatList
              data={SizeItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
          </SectionComponent>
          <SectionComponent>
            <TextComponent text={"Description"} title />
            {/* Render the truncated or full description based on state */}
            <Text>
              {showFullDescription ? item.description : truncatedDescription}
            </Text>
            {/* Render "View more" link if description is longer than 100 characters */}
            {item.description.length > 100 && (
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={{ color: appColors.primary }}>
                  {showFullDescription ? "View less" : "View more"}
                </Text>
              </TouchableOpacity>
            )}
          </SectionComponent>
          <SectionComponent>
            <TextComponent title text="Review" />

            {/* start render */}
            <SectionComponent>
              <RowComponents>
                <View>
                  <TextComponent
                    styles={{ marginLeft: 12 }}
                    size={60}
                    text={averageRates}
                  />
                  {renderAverageStars()}
                </View>
                <SpaceComponent width={60} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderedRates}
                </View>
              </RowComponents>
            </SectionComponent>
            {/* start render */}
            <View style={{ position: "relative" }}>
              <TouchableOpacity onPress={openModal}>
                <SectionComponent>
                  <RowComponents
                    justify="flex-start"
                    styles={{
                      borderRadius: 5,
                      width: "20%",
                    }}
                  >
                    <MaterialIcons name="filter-list" size={24} color="black" />
                    <TextComponent text={"Filter"} />
                  </RowComponents>
                </SectionComponent>
              </TouchableOpacity>
              {isOpen && (
                <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 30,
                    left: 50,
                    padding: 10,
                    backgroundColor: appColors.gray5,
                    borderRadius: 5,
                    width: 150,
                  }}
                >
                  <TouchableOpacity>
                    <TextComponent text={"From Highest Star"} />
                  </TouchableOpacity>
                  <SpaceComponent height={10} />
                  <TouchableOpacity>
                    <TextComponent text={"From Lowest Star"} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%" }}
            >
              <FlatList
                // key={"_"}
                // showsHorizontalScrollIndicator={false}
                // horizontal={true}
                ref={flatListRef}
                data={sortedFeedbacks}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <CardComponents
                    isShadow
                    styles={{
                      paddingVertical: 10,
                      width: appInfo.sizes.WIDTH * 0.9,
                    }}
                    isTouchable
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <RowComponents>
                        <View>
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 9999,
                            }}
                          />
                        </View>
                        <SpaceComponent width={20} />
                        <TextComponent
                          text={item.name}
                          color={appColors.text}
                          size={20}
                        />
                      </RowComponents>
                      <SpaceComponent width={10} />
                      <RowComponents
                        justify="space-between"
                        styles={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <RowComponents>
                          {renderStarsAlone(item.rate, index)}
                          <Text style={{ marginTop: 20 }}>
                            ({calculateRateCount(item.rate)})
                          </Text>
                        </RowComponents>
                        <SpaceComponent width={10} />
                        <TextComponent
                          styles={{ marginTop: 20 }}
                          text={formatDate(item.timeComment)}
                          color={appColors.gray}
                          size={15}
                        />
                      </RowComponents>
                      <SpaceComponent height={20} />
                      <RowComponents>
                        <View style={{ width: "100%" }}>
                          <TextComponent size={18} text={item.title} />
                        </View>
                      </RowComponents>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                    >
                      <RowComponents>
                        <AntDesign
                          name="heart"
                          size={20}
                          color={appColors.danger}
                        />
                        <SpaceComponent width={10} />

                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: appColors.gray,
                            height: "100%",
                          }}
                        ></View>
                        <SpaceComponent width={10} />
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color="black"
                        />
                      </RowComponents>
                    </View>
                  </CardComponents>
                )}
              />
            </ScrollView>
          </SectionComponent>
          <SpaceComponent height={200} />
        </View>
      </ScrollView>
      <SectionComponent
        styles={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ButtonComponent
          onPress={() => navigation.navigate("SuccessScreen")}
          type="primary"
          text="Buy Now"
          textStyles={{ fontSize: 100, fontWeight: "bold" }}
          iconFlex="right"
          icon={
            <CircleComponent color={appColors.buttonBackground}>
              <AntDesign name="arrowright" size={24} color={appColors.white} />
            </CircleComponent>
          }
        />
      </SectionComponent>
    </GestureHandlerRootView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
