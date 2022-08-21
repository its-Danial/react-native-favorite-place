import React, { FC } from "react";
import { Alert } from "react-native";

import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/Place";
import { RootStackScreenProps } from "../types";

type AddPlacesScreenProps = RootStackScreenProps<"AddPlaces">;

const AddPlacesScreen: FC<AddPlacesScreenProps> = (props) => {
  const onSaveCreatedPlaceHandler = (place: Place) => {
    if (place.title.trim().length === 0 || place.imageUri.trim().length === 0 || !place.location) {
      Alert.alert("Missing input", "Please fill in all information to save your favorite place");
      return;
    }
    props.navigation.navigate("AllPlaces", { place: place });
  };

  return (
    <ScreenTemplate>
      <PlaceForm onSaveCreatedPlace={onSaveCreatedPlaceHandler} />
    </ScreenTemplate>
  );
};
export default AddPlacesScreen;
