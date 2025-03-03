import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppRouter from "./src/navigators/AppRouter";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
const STRIPE_KEY =
  "pk_test_51P7cvEFCzIlVME0TNnsPXwmr2bqsPeeVLEGHaYbLOD8eNOpHQrZQBbjzjh5v4smwpceeceZtoWUJkDtS5tbPej4K000oJm7MxD";
export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <AppRouter />
          <Toast />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
