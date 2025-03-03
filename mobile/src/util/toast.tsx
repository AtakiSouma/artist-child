import Toast from "react-native-toast-message";
export const showSuccessToast = () => {
  Toast.show({
    type: "success",
    text1: "Added Successfully",
    text2: "You had been added item to WishList Screen👋",
  });
};
export const showInfoToast = () => {
  Toast.show({
    type: "error",
    text1: "Deleted Successfully",
    text2: "You had been delete item to WishList Screen👋",
  });
};
export const showSucessToastCompleteChapter = () => {
  Toast.show({
    type: "success",
    text1: "Successfully",
    text2: "You have completed successfully",
  });
}