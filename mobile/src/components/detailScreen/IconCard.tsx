import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import RowComponents from "../Global/RowComponents";
import CardComponents from "../CardComponents";
import SpaceComponent from "../Global/SpaceComponent.";
import TextComponent from "../Global/TextComponent";
import { appColors } from "../../constants/appColors";
import { globalStyles } from "../../style/globalStyles";
type Props = {
  title: string | number;
  icon: ReactNode;
};
const IconCard = (props: Props) => {
  const { icon, title } = props;
  return (
    <View>
      <RowComponents styles={{ marginRight: 20, marginTop: 10 }}>
        <CardComponents
          styles={[globalStyles.noSpaceCard, { width: 48, height: 48 }]}
          color={`${appColors.primary}4D`}
        >
          {icon && icon}
        </CardComponents>
        <SpaceComponent width={16} />
        <View
          style={{
            flex: 1,
            height: 48,
            justifyContent: "space-around",
          }}
        >
          <TextComponent text={title} size={18} color={appColors.gray} />
        </View>
      </RowComponents>
    </View>
  );
};

export default IconCard;

const styles = StyleSheet.create({});
