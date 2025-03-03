import React from "react";
import RowComponents from "./RowComponents";
import TextComponent from "./TextComponent";
import { appColors } from "../../constants/appColors";
import { AntDesign } from "@expo/vector-icons";



interface Props {
  title: string;
  onPress?: () => void;
}
const TabBarComponent = (props: Props) => {
  const { title, onPress } = props;

  return (
    <RowComponents
      styles={{
        marginBottom: 10,
        paddingHorizontal: 16,
      }}
    >
      <TextComponent text={title} title flex={1} size={18} />

      {onPress && (
        <RowComponents onPress={onPress}>
          <TextComponent text="See All " size={12} color={appColors.text2} />
          <AntDesign name="arrowright" size={24} color={appColors.text2} style={{fontWeight:"bold"}}/>
        </RowComponents>
      )}
    </RowComponents>
  );
};

export default TabBarComponent;
