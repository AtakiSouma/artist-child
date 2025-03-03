import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useState } from "react";
import RowComponents from "../Global/RowComponents";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors } from "../../constants/appColors";
import SpaceComponent from "../Global/SpaceComponent.";
type Props = {
  description: string;
  icon: ReactNode;
  id: string;
};
const BenefitComponents = (props: Props) => {
  const { icon, id, description } = props;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const truncatedDescription =
    description.length > 50 ? `${description.slice(0, 50)}...` : description;
  return (
    <RowComponents key={id} justify="flex-start" styles={{alignContent:"center" , alignItems:"flex-start"}}>
      {icon && icon}
      <SpaceComponent width={10}/>
      <View style={{ marginLeft: 5 }}>
        <Text>{showFullDescription ? description : truncatedDescription}</Text>
        {description.length > 50 && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={{ color: appColors.primary }}>
              {showFullDescription ? "View less" : "View more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </RowComponents>
  );
};

export default BenefitComponents;

const styles = StyleSheet.create({});
