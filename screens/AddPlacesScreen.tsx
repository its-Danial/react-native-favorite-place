import { useHeaderHeight } from "@react-navigation/elements";
import React, { FC } from "react";
import { Text } from "react-native";
import tw from "twrnc";
import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlaceForm from "../components/Places/PlaceForm";

type AddPlacesScreenProps = {};

const AddPlacesScreen: FC<AddPlacesScreenProps> = (props) => {
  return (
    <ScreenTemplate>
      <PlaceForm />
    </ScreenTemplate>
  );
};
export default AddPlacesScreen;
