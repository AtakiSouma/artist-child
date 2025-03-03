import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import WatchData, { WatchProps } from "../../data/watch";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import RowComponents from "../../components/Global/RowComponents";
import ContainerComponent from "../../components/ContainerComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import InputComponent from "../../components/Input/InputComponents";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { appColors } from "../../constants/appColors";
import CardComponents from "../../components/CardComponents";
import TextComponent from "../../components/Global/TextComponent";
import TagComponent from "../../components/Global/TagComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleComponent from "../../components/Global/CircleComponent";
import SectionComponent from "../../components/SectionComponents";
import LottieView from "lottie-react-native";
import { appInfo } from "../../constants/appInfos";
import { useFocusEffect } from "@react-navigation/native";
import { OrderData } from "../../models/order.model";
import { useAppSelector } from "../../redux/hook";
import orderApi from "../../api/orderApi";
import ImageComponent from "../../components/ImageComponent";
import formatDate from "../../util/formatDate";
import IconCard from "../../components/detailScreen/IconCard";
const CartScreen = ({ navigation }: any) => {

  const [order, setOrder] = useState<OrderData[]>([]);
  const auth = useAppSelector((state) => state.auth);
  useFocusEffect(
    React.useCallback(() => {
      const handleGetUserOrder = async () => {
        try {
          const api = `/user/${auth.currentUser.id}`;
          const res = await orderApi.HandleOrderApi(api, "get");
          setOrder(res.data);
          console.log("order", order);
        } catch (error) {
          console.log(error);
          Alert.alert("Some thing went wrong");
        }
      };
      handleGetUserOrder();
    }, [setOrder])
  );

  return (
    <>
      <ContainerComponent isImageBackground>
        <SpaceComponent height={40} />
        <View style={{ marginHorizontal: 15 }}>

          <InputComponent
            divider
            affix={
              <AntDesign
                name="search1"
                size={24}
                style={{ fontWeight: "bold" }}
                color={appColors.primary}
              />
            }
            value=""
            onChange={() => { }}
          // value={searchQuery}
          // onChange={handleSearch}
          />
        </View>
        <>

          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={order}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("CourseDetailBought", { item });
                }}
              >
                <View
                  style={{
                    width: appInfo.sizes.WIDTH * 1,
                    backgroundColor: appColors.white2,
                    marginVertical: 2,
                    overflow: "hidden",
                    borderBottomWidth: 2, 
                    borderBottomColor: "#ddd", 
                  }}
                >
                  <RowComponents
                    justify="flex-start"
                    styles={{
                      alignItems: "center",
                      alignContent: "center",
                      marginTop: 16,
                    }}
                  >
                    <ImageComponent
                      url={item.courseId.thumbnail.url}
                      stylesImage={{
                        width: 180,
                        height: 140,
                        resizeMode: "cover",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    />
                    <View style={{ marginLeft: 10, maxWidth: '60%' }}>
                      <RowComponents justify="flex-start">
                        <FontAwesome5
                          name="book-open"
                          size={18}
                          color={appColors.primary}
                        />
                        <SpaceComponent width={5} />
                        <TextComponent
                          text={item.courseId.name}
                          styles={{ overflow: "hidden", flexWrap: 'wrap', maxWidth: '80%' }} // Cho phép xuống dòng khi quá dài
                          numOfLine={5}
                          size={17}
                        />
                      </RowComponents>
                      <SpaceComponent height={10} />
                      <RowComponents justify="flex-start">
                        <Ionicons
                          name="pricetags"
                          size={20}
                          color={appColors.primary}
                        />
                        <SpaceComponent width={5} />
                        <TextComponent text={item.courseId.price} size={20} />
                      </RowComponents>
                      <SpaceComponent height={10} />
                      <RowComponents justify="flex-start">
                        <Fontisto
                          name="date"
                          size={20}
                          color={appColors.primary}
                        />
                        <SpaceComponent width={5} />
                        <TextComponent text={formatDate(item.createdAt)} />
                      </RowComponents>
                    </View>
                  </RowComponents>

                </View>
              </TouchableOpacity>
            )}
          />

          {/* )} */}
        </>
      </ContainerComponent>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
