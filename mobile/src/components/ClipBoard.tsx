import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CardComponents from "./CardComponents";
import RowComponents from "./Global/RowComponents";
import { Feather } from "@expo/vector-icons";
import Clipboard from "@react-native-clipboard/clipboard";

type Props = {
  url: string;
};
const ClipBoardComponent = (props: Props) => {
  const { url } = props;
  const [copiedText, setCopiedText] = useState("");
  const copyToClipboard = () => {
    Clipboard.setString(url);
  };
  return (
    <View
      style={{
        marginTop:3,
        backgroundColor: "##e6ede8",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <RowComponents justify="space-between">
        <Text>{url.length > 45 ? url.substring(0, 45) + "..." : url}</Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Feather name="copy" size={24} color="black" />
        </TouchableOpacity>
      </RowComponents>
    </View>
  );
};

export default ClipBoardComponent;

const styles = StyleSheet.create({});
