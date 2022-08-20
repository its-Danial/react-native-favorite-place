import { FC, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import tw from "twrnc";
import OutlineButton from "../UI/OutlineButton";

type ImagePickerProps = {
  onPickImage: (imageUri: string) => void;
};

const ImagePicker: FC<ImagePickerProps> = (props) => {
  const [cameraPermissionsInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();
  // "file:///var/mobile/Containers/Data/Application/E5B6662B-EA34-44EA-88A9-1A9B93A31341/Library/Caches/ExponentExperienceData/%2540anonymous%252Ffavorite-places-2804a5c3-5156-4bd0-ba39-24dce065b6c6/ImagePicker/B4ABC54A-B7E3-4E2A-9D55-B4AAFA61D72C.jpg"

  const verifyPermissions = async () => {
    if (cameraPermissionsInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionsInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient permissions", "You need to grant camera permissions to use the applications");
      return false;
    } else {
      return true;
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    // @ts-ignore
    setPickedImage(image.uri);
    // @ts-ignore
    props.onPickImage(image.uri);
  };

  let imagePreview = <Text style={tw`text-gray-400`}>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={tw`w-full h-full rounded`} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={tw`w-full h-52 my-2 justify-center items-center rounded bg-gray-800 shadow-gray-400 `}>
        {imagePreview}
      </View>
      <OutlineButton icon={"camera"} onPress={takeImageHandler}>
        Take a Picture
      </OutlineButton>
    </View>
  );
};
export default ImagePicker;
