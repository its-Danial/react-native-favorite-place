import { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

type OutlineButtonProps = {
  children: React.ReactNode;
  icon: any;
  onPress: () => void;
};

const OutlineButton: FC<OutlineButtonProps> = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) =>
        tw`px-3 py-[6px] my-2 justify-center items-center flex-row bg-sky-600 rounded shadow-md ${
          pressed ? "opacity-70" : ""
        }`
      }
    >
      <Ionicons style={tw`m-[6px]`} name={props.icon} size={21} color={tw.color("gray-300")} />
      <Text style={tw`text-gray-300 font-bold text-sm`}>{props.children}</Text>
    </Pressable>
  );
};
export default OutlineButton;
