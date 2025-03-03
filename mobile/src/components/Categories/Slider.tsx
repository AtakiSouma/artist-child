import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import App from "../../../App";
import { appInfo } from "../../constants/appInfos";

interface SliderList {
  id: string;
  image: string;
}
const sliders: SliderList[] = [
  {
    id: "1",
    image:
      "https://img.freepik.com/premium-photo/art-child-frame-with-laptop-empty-paper-supplies-making-creative_494619-306.jpg?size=626&ext=jpg",
  },
  {
    id: "2",
    image:
      "https://previews.123rf.com/images/kraphix/kraphix2006/kraphix200600029/150368110-e-learning-online-education-concept-illustration-group-of-children-with-learning-activities-kids.jpg",
  },
  {
    id: "3",
    image:
      "https://d1ng1bucl7w66k.cloudfront.net/ghost-blog/2021/11/Screen-Shot-2021-11-11-at-11.14.19-AM.png",
  },
];
const Slider = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: 5, marginHorizontal: 10 }}>
        <FlatList
          data={sliders}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Image
                alt={item.id}
                source={{ uri: item.image }}
                style={{
                  height: 150,
                  width: appInfo.sizes.WIDTH * 0.7,
                  borderRadius: 20,
                  marginRight: 15,
                }}
              />
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Slider;
