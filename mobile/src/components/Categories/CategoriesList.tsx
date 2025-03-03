import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { appColors } from "../../constants/appColors";
import TagComponent from "../Global/TagComponent";
export interface Category {
  _id?: string;
  color?: string;
  title?: string;
  key?: string;
  label: string;
  icon?: React.JSX.Element;
}

interface Props {
  isFill?: boolean;
}
const CategoriesList = (props: Props) => {
  const { isFill } = props;
  const categories: Category[] = [
    {
      key: "sport",
      label: "Sports",
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : "#F0635A"}
          size={20}
        />
      ),
      color: "#F0635A",
    },
    {
      key: "mucsic",
      label: "Music",
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColors.white : "#F59762"}
          size={20}
        />
      ),
      color: "#F59762",
    },
    {
      key: "art",
      label: "Art",
      icon: (
        <Ionicons
          name="color-palette"
          size={20}
          color={isFill ? appColors.white : "#46CDFB"}
        />
      ),
      color: "#46CDFB",
    },
  ];

  return (
    <GestureHandlerRootView>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item, index }) => (
          <TagComponent
            styles={{
              marginRight: index === categories.length - 1 ? 28 : 12,
              minWidth: 82,
            }}
            bgColor={isFill ? item.color : appColors.white}
            onPress={() => {}}
            icon={item.icon}
            label={item.label}
            textColor={isFill ? appColors.white : appColors.text2}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({});
