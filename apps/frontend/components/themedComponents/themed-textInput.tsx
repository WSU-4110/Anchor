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
  type: "default";
};

export function TTextInput({
  style,
  lightColor,
  darkColor,
  type,
  ...rest
}: ThemedTextInput) {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? (
    <TextInput
      style={[, type === "default" ? darkTheme.default : undefined]}
      {...rest}
    />
  ) : (
    <TextInput
      style={[, type === "default" ? lightTheme.default : undefined]}
      {...rest}
    />
  );
}

const darkTheme = StyleSheet.create({
  default: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#aac7b6",
    color: "#061f20",
  },
});

const lightTheme = StyleSheet.create({
  default: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#061f20",
    color: "#FFF",
  },
});
