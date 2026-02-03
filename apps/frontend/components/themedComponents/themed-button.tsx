import { PressableScale } from "pressto";
import { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle, } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

type TButtonProps = {
  type: "primary" | "secondary" | "link" | "outline";
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>; // Add this line
};
export function TButton({style, onPress, children, type = "primary" }: TButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
const baseStyle = theme[type === "outline" ? "primary" : type] || {};

  return (
    <View>
          <PressableScale
            style={[baseStyle, style]}
            onPress={onPress}
          >
            {children}
          </PressableScale>
        </View>
  );
}
const darkTheme = StyleSheet.create({
  primary: {
    padding: 10,
    borderRadius: 10,
    color: "#061f20",
    backgroundColor: "#aac7b6",
    width: 200,
    display: "flex",
    alignItems: "center",
  },
  link: {},
  secondary: {
    padding: 10,
    borderRadius: 10,
    color: "#061f20",
    backgroundColor: "#74b890",
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});
const lightTheme = StyleSheet.create({
  primary: {
    padding: 10,
    borderRadius: 10,
    color: "#061f20",
    backgroundColor: "#b5e6c9",
    width: 200,
    display: "flex",
    alignItems: "center",
  },
  link: {},
  secondary: {
    padding: 10,
    borderRadius: 10,
    color: "#061f20",
    backgroundColor: "#81c79e",
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});
