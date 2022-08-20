import { useHeaderHeight } from "@react-navigation/elements";
import React, { FC } from "react";
import { Text } from "react-native";
import tw from "twrnc";
import ScreenTemplate from "../components/Layout/ScreenTemplate";

type AddPlacesScreenProps = {};

const AddPlacesScreen: FC<AddPlacesScreenProps> = (props) => {
  return (
    <ScreenTemplate>
      <Text style={tw`text-lg text-red-500`}>Hello</Text>
    </ScreenTemplate>
  );
};
export default AddPlacesScreen;
