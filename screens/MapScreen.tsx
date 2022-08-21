import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Text } from "react-native";
import MapView, { Callout, Circle, MapPressEvent, Marker, MarkerDragStartEndEvent } from "react-native-maps";
import tw from "twrnc";
import Map from "../components/Places/Map";
import IconButton from "../components/UI/IconButton";
import { LocationType } from "../models/Place";
import { RootStackScreenProps } from "../types";

type MapScreenProps = RootStackScreenProps<"Map">;

const MapScreen: FC<MapScreenProps> = (props) => {
  const [pickedLocation, setPickedLocation] = useState<LocationType>();

  const initialLocation = props.route.params && props.route.params.initialLocation;

  useEffect(() => {
    if (initialLocation) {
      setPickedLocation(initialLocation);
    }
  }, []);

  const onSelectLocationHandler = (newLocation: LocationType) => {
    if (initialLocation) {
      return;
    }
    setPickedLocation(newLocation);
  };

  const onSavedPickedLocationHandler = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert("No locations Picked", "You have to pick a location (by trapping or dragging) on the map");
      return;
    }
    props.navigation.navigate("AddPlaces", { pickedLocation: pickedLocation });
  }, [props.navigation, pickedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    props.navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton color={tintColor} name="save" onPress={onSavedPickedLocationHandler} size={26} />
      ),
    });
  }, [props.navigation, onSavedPickedLocationHandler, initialLocation]);

  return (
    <Map
      allowSelect={true}
      haveIntialLocation={!!initialLocation}
      onLocationChange={onSelectLocationHandler}
      pickedLocation={pickedLocation}
    />
  );
};
export default MapScreen;
