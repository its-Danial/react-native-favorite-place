import React, { FC } from "react";
import { Alert } from "react-native";

import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/Place";
import { RootStackScreenProps } from "../types";
import { insertPlacesToDbTable } from "../utils/database";

type AddPlacesScreenProps = RootStackScreenProps<"AddPlaces">;

const AddPlacesScreen: FC<AddPlacesScreenProps> = (props) => {
  const onSaveCreatedPlaceHandler = async (place: Place) => {
    if (place.title.trim().length === 0 || place.imageUri.trim().length === 0 || !place.location) {
      Alert.alert("Missing input", "Please fill in all information to save your favorite place");
      return;
    }
    await insertPlacesToDbTable(place);
    props.navigation.navigate("AllPlaces");
  };

  return (
    <ScreenTemplate>
      <PlaceForm onSaveCreatedPlace={onSaveCreatedPlaceHandler} />
    </ScreenTemplate>
  );
};
export default AddPlacesScreen;
