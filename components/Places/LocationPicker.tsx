import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { LocationType } from "../../models/Place";
import { RootStackParamList } from "../../types";
import OutlineButton from "../UI/OutlineButton";
import Map from "./Map";
import { getAddressFromCoordinates } from "../../utils/ReverseGeocoding";

type LocationPickerProps = {
  onPickLocation: (location: (LocationType & { address: string }) | undefined) => void;
};

const LocationPicker: FC<LocationPickerProps> = (props) => {
  const route = useRoute<RouteProp<RootStackParamList, "AddPlaces">>();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();
  const [locationStatusInfo, requestPermission] = useForegroundPermissions();
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<LocationType>();

  useLayoutEffect(() => {
    if (isScreenFocused && route.params) {
      const mapScreenPickedLocation = route.params.pickedLocation;
      setPickedLocation(mapScreenPickedLocation);
    }
  }, [route, isScreenFocused]);

  useEffect(() => {
    const handleAddress = async () => {
      if (pickedLocation) {
        const address: string = await getAddressFromCoordinates(pickedLocation as LocationType);
        props.onPickLocation({ ...(pickedLocation as LocationType), address: address });
      }
    };
    handleAddress();
  }, [pickedLocation, props.onPickLocation]);

  const verifyPermissions = async () => {
    if (locationStatusInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    } else if (locationStatusInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient permissions", "You need to grant location permissions to use the applications");
      return false;
    } else {
      return true;
    }
  };

  const getLocationHandler = async () => {
    const hasPermission = verifyPermissions();
    if (!hasPermission) {
      return;
    }
    setLocationIsLoading(true);

    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocationIsLoading(false);
  };

  const pickLocationHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={tw`relative w-full h-52 my-2 justify-center items-center rounded bg-gray-800 shadow-gray-400 `}>
        <Map pickedLocation={pickedLocation} allowSelect={false} />
        {locationIsLoading && <ActivityIndicator style={tw`absolute`} size="large" color={tw.color("sky-200")} />}
      </View>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`w-[47%]`}>
          <OutlineButton icon="location" onPress={getLocationHandler}>
            Locate Me
          </OutlineButton>
        </View>
        <View style={tw`w-[47%]`}>
          <OutlineButton icon="map" onPress={pickLocationHandler}>
            Pick on Map
          </OutlineButton>
        </View>
      </View>
    </View>
  );
};
export default LocationPicker;
