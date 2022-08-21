import { useIsFocused } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlacesList from "../components/Places/PlacesList";
import { Place } from "../models/Place";
import { RootStackScreenProps } from "../types";

type AllPlacesScreenProps = RootStackScreenProps<"AllPlaces">;

const AllPlacesScreen: FC<AllPlacesScreenProps> = (props) => {
  const [loadedFavPlaces, setLoadedFavPlaces] = useState<Place[]>([]);

  const screenIsFocused = useIsFocused();

  useEffect(() => {
    if (screenIsFocused && props.route.params) {
      setLoadedFavPlaces((prevPlaces) => [props.route.params.place, ...prevPlaces]);

      console.log(loadedFavPlaces);
    }
  }, [screenIsFocused, props.route]);

  return (
    <ScreenTemplate>
      <PlacesList places={loadedFavPlaces} />
    </ScreenTemplate>
  );
};
export default AllPlacesScreen;
