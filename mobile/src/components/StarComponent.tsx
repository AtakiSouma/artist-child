import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
type Props = {
  rate: number;
  totalReview: number;
};
const StarComponent = (props: Props) => {
  const { rate, totalReview } = props;
  const fullStars = Math.floor(rate);
  const fractionalPart = rate - fullStars;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<AntDesign key={i} name="star" size={24} color="yellow" />);
  }
  if (fractionalPart >= 0.25 && fractionalPart < 0.9) {
    stars.push(
      <FontAwesome key="half" name="star-half-full" size={24} color="yellow" />
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
      <Text>~({totalReview} Reviews)</Text>
    </View>
  );
};

export default StarComponent;

const styles = StyleSheet.create({});
