import { FC } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Place } from "../../models/Place";
import tw from "twrnc";

type PlaceItemProps = {
  place: Place;
  onSelect: (id: string) => void;
};

const PlaceItem: FC<PlaceItemProps> = ({ place, onSelect }) => {
  const onPressHandler = () => {
    onSelect(place.id);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text style={tw`text-lg text-white`}>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};
export default PlaceItem;
