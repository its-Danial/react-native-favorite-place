import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../components/UI/IconButton";
import AddPlacesScreen from "../screens/AddPlacesScreen";
import AllPlacesScreen from "../screens/AllPlacesScreen";
import tw from "twrnc";
import { RootStackParamList } from "../types";
import { LinearGradient } from "expo-linear-gradient";

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
    <Stack.Navigator
      screenOptions={{
        headerTintColor: tw.color("sky-300"),
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlacesScreen}
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              color={tintColor}
              name="add"
              size={28}
              onPress={() => {
                navigation.navigate("AddPlaces");
              }}
            />
          ),
        })}
      />
      <Stack.Screen name="AddPlaces" component={AddPlacesScreen} options={{ title: "Add a New Place" }} />
    </Stack.Navigator>
  );
}
