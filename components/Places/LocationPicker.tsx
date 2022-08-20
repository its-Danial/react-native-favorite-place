import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import React, { FC, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import tw from "twrnc";
import { LocationType } from "../../models/Place";
import { RootStackParamList, RootStackScreenProps } from "../../types";
import OutlineButton from "../UI/OutlineButton";
import Map from "./Map";
type LocationPickerProps = {};

const LocationPicker: FC<LocationPickerProps> = (props) => {
  const route = useRoute<RouteProp<RootStackParamList, "AddPlaces">>();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();
  const [locationStatusInfo, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<LocationType>();

  useEffect(() => {
    if (isScreenFocused && route.params) {
      const mapScreenPickedLocation = route.params.pickedLocation;
      setPickedLocation(mapScreenPickedLocation);
    }
  }, [route, isScreenFocused]);

  const verifyPermissions = async () => {
    if (locationStatusInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationStatusInfo?.status === PermissionStatus.DENIED) {
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
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const pickLocationHandler = () => {
    navigation.navigate("Map");
  };
  return (
    <View>
      <View style={tw`w-full h-52 my-2 justify-center items-center rounded bg-gray-800 shadow-gray-400 `}>
        <Map pickedLocation={pickedLocation} allowSelect={false} />
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
