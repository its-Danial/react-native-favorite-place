import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import AddPlacesScreen from "../screens/AddPlacesScreen";
import AllPlacesScreen from "../screens/AllPlacesScreen";

import { RootStackParamList } from "../types";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllPlaces" component={AllPlacesScreen} />
      <Stack.Screen name="AddPlaces" component={AddPlacesScreen} />
    </Stack.Navigator>
  );
}
