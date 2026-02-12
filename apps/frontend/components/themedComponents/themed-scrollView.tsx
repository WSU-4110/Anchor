import { ScrollView, type ScrollViewProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color"; // Adjust path as needed

export function TScrollView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ScrollViewProps & { lightColor?: string; darkColor?: string }) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
