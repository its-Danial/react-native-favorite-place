import { FC } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Place } from "../../models/Place";
import tw from "twrnc";

type PlaceItemProps = {
  place: Place;
  onSelect: (id: number) => void;
};

const PlaceItem: FC<PlaceItemProps> = ({ place, onSelect }) => {
  const onPressHandler = () => {
    onSelect(place.id);
  };
  return (
    <Pressable
      style={({ pressed }) =>
        tw`flex-row items-start rounded-md my-2 bg-gray-800 shadow-md overflow-hidden ${pressed ? "opacity-70" : ""}`
      }
      onPress={onPressHandler}
    >
      <Image style={tw`flex-1 h-full`} source={{ uri: place.imageUri }} />
      <View style={tw`flex-1.6  p-3`}>
        <Text style={tw`text-lg text-gray-300 font-bold`}>{place.title}</Text>
        <Text style={tw`text-sm text-gray-400`}>{place.address}</Text>
      </View>
    </Pressable>
  );
};
export default PlaceItem;
