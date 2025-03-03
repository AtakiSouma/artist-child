import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/button/ButtonComponent";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { removeAuth } from "../../redux/slide/authSlice";
import { globalStyles } from "../../style/globalStyles";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../../constants/appColors";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import RowComponents from "../../components/Global/RowComponents";
import TextComponent from "../../components/Global/TextComponent";
import CircleComponent from "../../components/Global/CircleComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import TagComponent from "../../components/Global/TagComponent";
import CategoriesList from "../../components/Categories/CategoriesList";
import Slider from "../../components/Categories/Slider";
import TabBarComponent from "../../components/Global/TabBarComponent";
import WatchData, { WatchProps, feedBackData } from "../../data/watch";
import CardItem from "../../components/CardItem";
import Toast from "react-native-toast-message";
import { showInfoToast, showSuccessToast } from "../../util/toast";
import courseApi from "../../api/courseApi";
import CardCourse from "../../components/Card/CardCourse";
import InstructorData, { InstructorProps } from "../../data/instructos";
import { isAnimationTerminatingCalculation } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import InstructorsCard from "../../components/InstructorsCard";
import CardProcessing from "../../components/Card/CardProcessing";
import VideoTest from "../../components/VideoTestComponent";

const HomeScreen = ({ navigation }: any) => {
  // const data: WatchProps[] = WatchData;
  const instructorData: InstructorProps[] = InstructorData;
  const auth = useAppSelector((state) => state.auth);
  if (!auth.currentUser.name) {
    return <></>;
  }
  useEffect(() => {
    AsyncStorage.getItem("bookmarks").then((value) => {
      if (value !== null) {
        const bookmarksArray = JSON.parse(value);
        console.log(bookmarksArray);
      }
    });
  }, []);
  // TODO:Step:1: Initialize bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("bookmarks")
        .then((value) => {
          if (value !== null) {
            const bookmarksArray = JSON.parse(value);
            setBookmarks(bookmarksArray);
          } else {
            setBookmarks([]);
          }
        })
        .catch((error) => console.error("Error retrieving bookmarks: ", error));
    }, [])
  );

  // TODO:Step 2: Toggle bookmark status
  const [isBookmarked, setIsBookMarked] = useState(true);
  const handleToggleBookMark = (itemId: string) => {
    const updatedBookmarks = [...bookmarks];
    const index = updatedBookmarks.indexOf(itemId);
    if (index !== -1) {
      updatedBookmarks.splice(index, 1);
      showInfoToast();
      // Remove from bookmarks
    } else {
      updatedBookmarks.push(itemId);
      showSuccessToast(); // Add to bookmarks
    }
    setBookmarks(updatedBookmarks);
    AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  // TODO:handle get course
  const [courseData, setCourseData] = useState<any>();
  const [courseBought, setCourseBought] = useState<any>();
  const getAllCourse = async () => {
    const api = "/get-all-courses";
    try {
      const course = await courseApi.HandleEvent(api, {}, "get");
      setCourseData(course.data);
    } catch (error) {}
  };
  const getAllCourseBoughtByUser = async () => {
    const api = `/get-all/bought/${auth.currentUser.id}`;
    try {
      const courseBought = await courseApi.HandleEvent(api, {}, "get");
      setCourseBought(courseBought.data);
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllCourseBoughtByUser();
      getAllCourse();
    }, [setCourseData, setCourseBought])
  );
  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />
      <View style={styles.ContainerStyle}>
        <View style={styles.ContainerViewInTopBar}>
          <RowComponents>
            <GestureHandlerRootView>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <SimpleLineIcons
                  name="menu"
                  size={24}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </GestureHandlerRootView>
            <View style={{ flex: 1, alignItems: "center" }}>
              <RowComponents styles={{ gap: 5 }}>
                <TextComponent text="Hello" color={appColors.white2} />
                <MaterialCommunityIcons
                  name="hand-wave"
                  size={17}
                  color={appColors.white}
                />
              </RowComponents>
              <TextComponent
                flex={0}
                text={`${auth.currentUser.name}`}
                size={13}
                color={appColors.white}
              />
            </View>
            <CircleComponent color={appColors.buttonBackground} size={36}>
              <View>
                <Ionicons
                  name="notifications-sharp"
                  size={20}
                  color={appColors.white}
                />
                <View style={styles.babelIconInNotification} />
              </View>
            </CircleComponent>
          </RowComponents>
          <SpaceComponent height={25} />
          <RowComponents>
            <RowComponents
              styles={{ flex: 1 }}
              onPress={() => navigation.navigate("FilterCourseScreen",)}
            >
              <FontAwesome
                name="search"
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponents>
            <TagComponent
              onPress={() =>
                navigation.navigate("FilterCourseScreen", {
                  isFilter: true,
                  item:courseData
                })
              }
              bgColor={appColors.buttonBackground}
              label="Filters"
              icon={
                <CircleComponent size={20} color={appColors.buttonBackground}>
                  <MaterialCommunityIcons
                    name="filter"
                    size={16}
                    color={appColors.white}
                  />
                </CircleComponent>
              }
            />
          </RowComponents>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 18,
        }}
      >
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Slider />
        </View>

        <TabBarComponent title="Your Course Processing" onPress={() => {}} />
        {/* popular */}
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.filter((item) => item.isPopular)}
          renderItem={({ item, index }) => (
            <CardItem
              type="card"
              item={item}
              key={item.id}
              isBookmarked={bookmarks.includes(item.id)}
              handleToggleBookMark={handleToggleBookMark}
              setIsBookmarked={setIsBookMarked}
            />
          )}
        /> */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courseBought}
          renderItem={({ item, index }) => <CardProcessing item={item} />}
        />
        <TabBarComponent title="All Courses" onPress={() => {}} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courseData}
          renderItem={({ item, index }) => <CardCourse item={item} />}
        />
        <TabBarComponent title="Our Instructors" onPress={() => {}} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={instructorData}
          renderItem={({ item, index }) => (
            <InstructorsCard instructor={item} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: appColors.primary,
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
  },
  ContainerViewInTopBar: {
    paddingHorizontal: 16,
    marginTop: 17,
  },
  babelIconInNotification: {
    backgroundColor: appColors.secondary,
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#524CE0",
    position: "absolute",
    top: -2,
    right: -2,
  },
});
