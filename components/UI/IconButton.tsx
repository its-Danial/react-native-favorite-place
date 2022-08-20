import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable } from "react-native";
import tw from "twrnc";

type IconButtonProps = {
  name: any;
  size: number;
  color: string | undefined;
  onPress: () => void;
};

const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`p-1 m-1 justify-center items-center rounded-full`,
        pressed && tw`opacity-60 bg-zinc-700`,
      ]}
      onPress={props.onPress}
    >
      <Ionicons color={props.color} name={props.name} size={props.size} />
    </Pressable>
  );
};
export default IconButton;
