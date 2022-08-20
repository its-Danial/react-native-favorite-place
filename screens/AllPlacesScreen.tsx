import { FC } from "react";
import { View, Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";

type AllPlacesScreenProps = {};

const AllPlacesScreen: FC<AllPlacesScreenProps> = (props) => {
  return <PlacesList />;
};
export default AllPlacesScreen;
