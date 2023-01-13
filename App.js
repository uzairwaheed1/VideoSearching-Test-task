import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/redux/rootReducer";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </Provider>
  );
}
