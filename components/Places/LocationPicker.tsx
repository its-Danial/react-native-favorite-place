import { FC } from "react";
import { View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import tw from "twrnc";
type LocationPickerProps = {};

const LocationPicker: FC<LocationPickerProps> = (props) => {
  const getLocationHandler = () => {};

  const pickLocationHandler = () => {};
  return (
    <View>
      <View style={tw`w-full h-52 my-2 justify-center items-center rounded bg-gray-800 shadow-gray-400 `}></View>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`w-[46%]`}>
          <OutlineButton icon="location" onPress={getLocationHandler}>
            Locate
          </OutlineButton>
        </View>
        <View style={tw`w-[46%]`}>
          <OutlineButton icon="map" onPress={pickLocationHandler}>
            Pick on Map
          </OutlineButton>
        </View>
      </View>
    </View>
  );
};
export default LocationPicker;
