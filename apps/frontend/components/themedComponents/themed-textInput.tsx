import { useThemeColor } from "@/hooks/use-theme-color";
import {
  TextInput,
  type TextInputProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
export type ThemedTextInput = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  required?: boolean;
  type: "default";
};

export function TTextInput({
  style,
  lightColor,
  darkColor,
  type,
  required,
  ...rest
}: ThemedTextInput) {
  const colorScheme = useColorScheme();

  const themeStyle =
    colorScheme === "dark" ? darkTheme.default : lightTheme.default;

  return (
    <TextInput
      style={[themeStyle, style]}
      {...rest} // value and onChangeText stay attached to the same native element
    />
  );
}

const darkTheme = StyleSheet.create({
  default: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#aac7b6",
    color: "#061f20",
  },
});

const lightTheme = StyleSheet.create({
  default: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#061f20",
    color: "#FFF",
  },
});
