import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../style/globalStyles";
import { appColors } from "../../constants/appColors";

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLine?: number;
  styles?: StyleProp<ViewStyle>;
  divider?: boolean;

}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type,
    onEnd,
    multiline,
    numberOfLine,
    styles,
    divider,
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[globalStyles.inputContainer, styles]}>
      {/* if have suffix -? suffix = suffix */}
      {affix ?? affix}
      {divider ? (
        <>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: appColors.primary,
              height: "100%",
              marginLeft: 10,
            }}
          ></View>
        </>
      ) : (
        <></>
      )}
      <TextInput
        style={[
          globalStyles.input,
          globalStyles.text,
          {
            paddingHorizontal: affix || suffix ? 12 : 0,
            textAlignVertical: multiline ? "top" : "auto",
          },
        ]}
        multiline={multiline}
        value={value}
        numberOfLines={numberOfLine}
        placeholder={placeholder ?? ""}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={"#747688"}
        keyboardType={type ?? "default"}
        autoCapitalize="none"
        onEndEditing={onEnd}
        
      />

      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange("")
        }
      >
        {isPassword ? (
          <FontAwesome
            name={isShowPass ? "eye-slash" : "eye"}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value &&
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
