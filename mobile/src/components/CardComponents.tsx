import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { appColors } from "../constants/appColors";
import { globalStyles } from "../style/globalStyles";
interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
  isTouchable?: boolean;
}

const CardComponents = (props: Props) => {
  const { onPress, children, styles, isShadow, color, isTouchable } = props;
  const localStyles: StyleProp<ViewStyle>[] = [
    globalStyles.card,
    isShadow ? globalStyles.shadow : undefined,
    { backgroundColor: color ?? appColors.white },
    styles,
  ];
  return (
    <>
      {!isTouchable ? (
        <TouchableOpacity style={localStyles} onPress={onPress}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={localStyles}>{children}</View>
      )}
    </>
  );
};

export default CardComponents;
