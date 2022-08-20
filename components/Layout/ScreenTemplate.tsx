import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import tw from "twrnc";

type ScreenTemplateProps = {
  children: React.ReactNode;
};

const ScreenTemplate: FC<ScreenTemplateProps> = (props) => {
  const headerHeight = useHeaderHeight();
  return (
    <LinearGradient
      style={tw`flex-1 pt-[${headerHeight}px]`}
      colors={[tw.color("black") as string, tw.color("gray-900") as string]}
    >
      {props.children}
    </LinearGradient>
  );
};
export default ScreenTemplate;
