import { View, Modal } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import TextComponent from "./Global/TextComponent";
interface Props {
  visible: boolean;
  mess?: string;
}
const LoadingLogin = (props: Props) => {
  const { visible } = props;
  return (
    <Modal
      visible={visible}
      style={[{ flex: 1 }]}
      transparent
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{
            width: 500,
            height: 500,
          }}
          source={require("../assets/animations/Loading.json")}
          autoPlay
          loop
        />
      </View>
      <TextComponent
        styles={{ position: "absolute", zIndex: 1, top: 500 ,left:120}}
        text="Please wait..."
        color={"#ffffff"}
        size={30}
      />
    </Modal>
  );
};

export default LoadingLogin;
