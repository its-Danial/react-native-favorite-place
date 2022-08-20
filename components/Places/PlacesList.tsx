import React, { FC } from "react";
import { FlatList, View, Text } from "react-native";
import { Place } from "../../models/Place";
import PlaceItem from "./PlaceItem";
import tw from "twrnc";

type PlacesListProps = {
  places?: Place[];
};

const PlacesList: FC<PlacesListProps> = (props) => {
  const onSelectHandler = (id: string) => {};

  if (!props.places || props.places.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-base text-center`}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={props.places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PlaceItem onSelect={onSelectHandler} place={item} />}
    />
  );
};
export default PlacesList;
