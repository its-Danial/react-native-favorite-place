import React, { FC } from "react";
import { FlatList, View, Text } from "react-native";
import { Place } from "../../models/Place";
import PlaceItem from "./PlaceItem";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

type PlacesListProps = {
  places: Place[];
};

const PlacesList: FC<PlacesListProps> = (props) => {
  const navigation = useNavigation();

  const onSelectHandler = (id: number) => {
    navigation.navigate("PlaceDetails", { placeId: id });
  };

  if (!props.places || props.places.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-base text-sky-300 text-center`}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={tw`mx-3 my-6`}
      data={props.places}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => <PlaceItem onSelect={onSelectHandler} place={item} />}
    />
  );
};
export default PlacesList;
