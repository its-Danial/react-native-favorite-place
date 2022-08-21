import { useIsFocused } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import ScreenTemplate from "../components/Layout/ScreenTemplate";
import PlacesList from "../components/Places/PlacesList";
import { Place } from "../models/Place";
import { RootStackScreenProps } from "../types";
import { fetchPlacesFromDatabase } from "../utils/database";

type AllPlacesScreenProps = RootStackScreenProps<"AllPlaces">;

const AllPlacesScreen: FC<AllPlacesScreenProps> = (props) => {
  const [loadedFavPlaces, setLoadedFavPlaces] = useState<Place[]>([]);

  const screenIsFocused = useIsFocused();

  useEffect(() => {
    const loadPlacesFromDb = async () => {
      const dbPlaces = (await fetchPlacesFromDatabase()) as Place[];
      setLoadedFavPlaces(dbPlaces);
    };

    if (screenIsFocused) {
      loadPlacesFromDb();
      // setLoadedFavPlaces((prevPlaces) => [props.route.params.place, ...prevPlaces]);
    }
  }, [screenIsFocused]);

  return (
    <ScreenTemplate>
      <PlacesList places={loadedFavPlaces} />
    </ScreenTemplate>
  );
};
export default AllPlacesScreen;
