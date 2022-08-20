import { FC } from "react";
import { View, Text } from "react-native";
import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlacesList from "../components/Places/PlacesList";

type AllPlacesScreenProps = {};

const AllPlacesScreen: FC<AllPlacesScreenProps> = (props) => {
  return (
    <ScreenTemplate>
      <PlacesList />
    </ScreenTemplate>
  );
};
export default AllPlacesScreen;
