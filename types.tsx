import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocationType } from "./models/Place";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AddPlaces: { pickedLocation: LocationType };
  AllPlaces: undefined;
  Map: undefined;
  PlaceDetails: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
