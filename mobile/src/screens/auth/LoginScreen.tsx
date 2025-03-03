import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import SectionComponent from "../../components/Global/SectionComponent";
import TextComponent from "../../components/Global/TextComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import InputComponent from "../../components/Input/InputComponents";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { appColors } from "../../constants/appColors";
import RowComponents from "../../components/Global/RowComponents";
import { Gesture, Switch } from "react-native-gesture-handler";
import ButtonComponent from "../../components/button/ButtonComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SocialLogin from "./components/SocialLogin";
const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);

  
  const handleLogin = () => {};
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={localStyles.logo}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/014/971/579/original/mountain-logo-design-modern-png.png",
          }}
          style={{ width: 180, height: 130, marginBottom: 30 }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Login" title size={30} />
        <SpaceComponent height={20} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={(val) => setEmail(val)}
          allowClear
          affix={
            <MaterialIcons
              name="attach-email"
              size={24}
              color={appColors.gray}
            />
          }
        />
        <InputComponent
          isPassword
          value={password}
          placeholder="Password"
          onChange={(val) => setPassword(val)}
          allowClear
          affix={<FontAwesome name="lock" size={24} color={appColors.gray} />}
        />
        <RowComponents justify="space-between">
          <RowComponents>
            <GestureHandlerRootView>
              <Switch
                trackColor={{ true: appColors.primary }}
                thumbColor={appColors.white}
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
            </GestureHandlerRootView>

            <SpaceComponent width={4} />
            <TextComponent text="Remember me" />
          </RowComponents>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            type="text"
          />
        </RowComponents>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          // disable={isLoading || isDisable}
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
          color={appColors.primary}
        />
      </SectionComponent>
      <SocialLogin/>
      <SectionComponent>
        <RowComponents justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponents>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
  },
});
