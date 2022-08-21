import { FC, useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { LocationType, Place } from "../../models/Place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

type PlaceFormProps = {
  onSaveCreatedPlace: (place: Place) => void;
};

const PlaceForm: FC<PlaceFormProps> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType & { address: string }>();

  const textChangeHandler = (enteredValue: string) => {
    setEnteredTitle(enteredValue);
  };

  const pickImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location: (LocationType & { address: string }) | undefined) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation?.address as string, {
      latitude: selectedLocation?.latitude as number,
      longitude: selectedLocation?.longitude as number,
    });
    props.onSaveCreatedPlace(placeData);
  };
  return (
    <ScrollView style={tw`flex-1 p-5`}>
      <View>
        <Text style={tw`font-bold mb-1 text-gray-100`}>Title</Text>
        <TextInput
          style={tw`my-2 p-4 text-base leading-tight text-gray-300 bg-gray-700 rounded-md shadow-md shadow-gray-400 shadow-opacity-20`}
          onChangeText={textChangeHandler}
          value={enteredTitle}
          placeholder="Name of your favorite place"
          placeholderTextColor={tw.color("gray-600")}
        />
      </View>
      <ImagePicker onPickImage={pickImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Save</Button>
    </ScrollView>
  );
};
export default PlaceForm;
