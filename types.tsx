import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocationType, Place } from "./models/Place";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AddPlaces: { pickedLocation: LocationType };
  AllPlaces: undefined;
  Map: { initialLocation: LocationType };
  PlaceDetails: { placeId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
