import { StyleSheet, Text, useColorScheme, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "secondary";
};

export function TText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? (
    <Text
      style={[
        { color },
        type === "default" ? darkTheme.default : undefined,
        type === "title" ? darkTheme.title : undefined,
        type === "defaultSemiBold" ? darkTheme.defaultSemiBold : undefined,
        type === "subtitle" ? darkTheme.subtitle : undefined,
        type === "link" ? darkTheme.link : undefined,
        type === "secondary" ? darkTheme.secondary : undefined,
        style,
      ]}
      {...rest}
    />
  ) : (
    <Text
      style={[
        { color },
        type === "default" ? lightTheme.default : undefined,
        type === "title" ? lightTheme.title : undefined,
        type === "defaultSemiBold" ? lightTheme.defaultSemiBold : undefined,
        type === "subtitle" ? lightTheme.subtitle : undefined,
        type === "link" ? lightTheme.link : undefined,
        type === "secondary" ? lightTheme.secondary : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const lightTheme = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: "#061f20",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#061f20",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#061f20",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#061f20",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#06377a",
  },
  secondary: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    color: "#061f20",
  },
});

const darkTheme = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: "#aac7b6",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#aac7b6",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#aac7b6",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aac7b6",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  secondary: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    color: "#061f20",
  },
});
