import {Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import { globalStyles } from '../../style/globalStyles';
import { fontFamilies } from '../../constants/fontFamilies';
import { appColors } from '../../constants/appColors';


interface Props {
  text: string | number; 
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numOfLine?: number;

}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, styles, title, numOfLine} = props;

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      numberOfLines={numOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font
            ? font
            : title
            ? font
            : undefined,
        },
        styles,
      ]}>
      {text || "WrongText"}
    </Text>
  );
};

export default TextComponent;
