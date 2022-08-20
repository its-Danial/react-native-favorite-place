import { FC, useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

type PlaceFormProps = {};

const PlaceForm: FC<PlaceFormProps> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const textChangeHandler = (enteredValue: string) => {
    setEnteredTitle(enteredValue);
  };
  return (
    <ScrollView style={tw`flex-1 p-5`}>
      <View>
        <Text style={tw`font-bold mb-1 text-gray-100`}>Title</Text>
        <TextInput
          style={tw`my-2  p-2 text-base text-gray-300 bg-gray-700 rounded shadow-md shadow-gray-400 shadow-opacity-20`}
          onChangeText={textChangeHandler}
          value={enteredTitle}
          placeholder="Name of your favorite place"
          placeholderTextColor={tw.color("gray-600")}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};
export default PlaceForm;
