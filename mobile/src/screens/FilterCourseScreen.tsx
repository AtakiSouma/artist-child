import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Course } from "../models/course.model";
import CardCourse from "../components/Card/CardCourse";
import { appColors } from "../constants/appColors";
import HeaderDetailScreen from "../components/HeaderDetailScreen";

const FilterItem = [
  {
    title: "Beginner",
    id: 2,
  },
  {
    title: "Basic",
    id: 3,
  },
  {
    title: "Intermediate",
    id: 4,
  },
  {
    title: "Expert",
    id: 5,
  },
];

const FilterCategories = [
  {
    title: "Cartooning for Kids",
    id: 2,
  },
  {
    title: "Basic Drawing for Kids",
    id: 3,
  },
  {
    title: "Creative Crafts for Kids",
    id: 4,
  },
  {
    title: "Storytelling Through Art",
    id: 5,
  },
  {
    title: "Exploring Colors",
    id: 6,
  },
  {
    title: "Nature and Landscape Art",
    id: 7,
  },
  {
    title: "Fantasy and Imaginary Worlds",
    id: 8,
  },
  {
    title: "Seasonal and Holiday Crafts",
    id: 9,
  },
  {
    title: "Art Exploration and Play",
    id: 10,
  },
];

const FilterCourseScreen = ({ navigation, route }: any) => {
  const { item }: { item: Course[] } = route.params;
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilterSelection = (level: string | null) => {
    setSelectedLevel((prevLevel) => (prevLevel === level ? null : level));
  };

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const isLevelSelected = (level: string) => {
    return selectedLevel === level;
  };

  const isCategorySelected = (category: string) => {
    return selectedCategory === category;
  };

  const filteredCourses = item.filter((course) => {
    const levelFilter =
      selectedLevel === null || course.level === selectedLevel;
    const categoryFilter =
      selectedCategory === null || course.categories.title === selectedCategory;
    return levelFilter && categoryFilter;
  });

  return (
    <View style={styles.container}>
      <HeaderDetailScreen
        goBack={() => navigation.goBack()}
        openDrawer={() => {}}
      />
      <View style={{ marginLeft: 20 }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={FilterItem}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFilterSelection(item.title)}>
              <View
                style={[
                  styles.filterButton,
                  isLevelSelected(item.title) && styles.selectedButton,
                ]}
              >
                <Text style={{ color: appColors.white }}>{item.title}</Text>
                {isLevelSelected(item.title) && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleFilterSelection(null)}
                  >
                    {/* <Text style={{ color: appColors.white }}>x</Text> */}
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={FilterCategories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategorySelection(item.title)}
            >
              <View
                style={[
                  styles.filterButton,
                  isCategorySelected(item.title) && styles.selectedButton,
                ]}
              >
                <Text style={{ color: appColors.white }}>{item.title}</Text>
                {isCategorySelected(item.title) && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleCategorySelection(null)}
                  >
                    {/* <Text style={{ color: appColors.white }}>x</Text> */}
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {filteredCourses.length === 0 ? (
          <Text
            style={{
              marginTop: 20,
              color: appColors.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            There are no courses that match your filter.
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCourses}
            style={{ marginTop: 20 }}
            renderItem={({ item, index }) => <CardCourse item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default FilterCourseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: appColors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: appColors.primaryBackground,
  },
  closeButton: {
    marginLeft: 5,
  },
});
