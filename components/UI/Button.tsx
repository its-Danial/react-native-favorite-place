import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import tw from "twrnc";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

const Button: FC<ButtonProps> = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) =>
        tw` my-2 justify-center items-center flex-row overflow-hidden rounded shadow-md ${pressed ? "opacity-70" : ""}`
      }
    >
      <LinearGradient
        style={tw`h-full w-full px-3 py-3 `}
        colors={[tw.color("sky-500") as string, tw.color("purple-500") as string]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={tw`text-center text-gray-200 font-bold text-base`}>{props.children}</Text>
      </LinearGradient>
    </Pressable>
  );
};
export default Button;
