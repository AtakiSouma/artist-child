import {
  ImageBackground,
  ImageBackgroundBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { WatchProps } from "../data/watch";
import RowComponents from "./Global/RowComponents";
import CardComponents from "./CardComponents";
import { globalStyles } from "../style/globalStyles";
import TextComponent from "./Global/TextComponent";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { appColors } from "../constants/appColors";
import { appInfo } from "../constants/appInfos";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: WatchProps;
  type: "card" | "list";
}
const CardWishList = (props: Props) => {
  const { item, type } = props;
  const navigation: any = useNavigation();
  return (
    <CardComponents
      isShadow
      color={appColors.white2}
      styles={{ width: appInfo.sizes.WIDTH * 0.6 }}
      onPress={() => navigation.navigate("EventDetail", { item })}
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
          <CardComponents styles={globalStyles.noSpaceCard} color="#ffffffB3">
            <RowComponents>
              <TextComponent text="5" />
              <AntDesign name="star" size={24} color="yellow" />
            </RowComponents>
          </CardComponents>
          {/* <CardComponents
            styles={[globalStyles.noSpaceCard]}
            color="#ffffffB3"
            onPress={()=>{}}
          >
            {isBookmarked ? (
              <AntDesign name="heart" size={22} color={appColors.danger2} />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )}
          </CardComponents> */}
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
  );
};

export default CardWishList;

const styles = StyleSheet.create({});
