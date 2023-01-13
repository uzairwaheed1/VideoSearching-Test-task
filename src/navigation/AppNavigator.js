import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import VideoScreen from "../modules/VideoScreen/VideoScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Video"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
