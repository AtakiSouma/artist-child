import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RowComponents from "./Global/RowComponents";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appColors } from "../constants/appColors";
type Props = {
  openDrawer?: any;
  goBack?: any;
};
const HeaderDetailScreen = (props: Props) => {
  const { openDrawer, goBack } = props;
  return (
    <View style={{ marginTop: 30, marginHorizontal: 20, paddingBottom: 5 }}>
      <RowComponents justify="space-between">
        <TouchableOpacity
          onPress={goBack}
          style={{
            width: 48,
            height: 48,
            justifyContent: "center",
          }}
        >
          <AntDesign name="arrowleft" size={34} color={appColors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openDrawer}
          style={{
            width: 48,
            height: 48,
            justifyContent: "center",
          }}
        >
          <Entypo name="menu" size={34} color={appColors.text} />
        </TouchableOpacity>
      </RowComponents>
    </View>
  );
};

export default HeaderDetailScreen;

const styles = StyleSheet.create({});
