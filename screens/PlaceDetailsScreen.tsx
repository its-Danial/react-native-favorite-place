import { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import tw from "twrnc";
import ScreenTemplate from "../components/Layout/ScreenTemplate";
import OutlineButton from "../components/UI/OutlineButton";
import { Place } from "../models/Place";
import { RootStackScreenProps } from "../types";
import { fetchPlaceDetailsFromDb } from "../utils/database";

type PlaceDetailsScreenProps = RootStackScreenProps<"PlaceDetails">;

const PlaceDetailsScreen: FC<PlaceDetailsScreenProps> = (props) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  const selectedPlaceId = props.route.params.placeId;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const loadedPlace = await fetchPlaceDetailsFromDb(selectedPlaceId);
        setFetchedPlace(loadedPlace as Place);

        props.navigation.setOptions({ title: fetchedPlace?.title });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlace();
  }, [selectedPlaceId]);

  const showOnMapHandler = () => {
    if (fetchedPlace) {
      props.navigation.navigate("Map", {
        initialLocation: fetchedPlace.location,
      });
    }
  };

  if (!fetchedPlace) {
    return (
      <ScreenTemplate>
        <View style={tw`flex-1 items-center justify-center`}>
          <Text>Loading place data...</Text>
        </View>
      </ScreenTemplate>
    );
  }

  return (
    <ScreenTemplate>
      <ScrollView style={tw``}>
        <Image source={{ uri: fetchedPlace?.imageUri }} style={tw`w-full h-[35%] min-h-[300px]`} />

        <View style={tw`items-center justify-center`}>
          <View style={tw`p-5`}>
            <Text style={tw`text-center font-bold text-base text-gray-100`}>{fetchedPlace?.address}</Text>
          </View>
          <OutlineButton icon="map" onPress={showOnMapHandler}>
            View on map
          </OutlineButton>
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
export default PlaceDetailsScreen;
