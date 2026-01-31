import "../global.css";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import { TButton } from "@/components/themedComponents/themed-button";
import { router } from "expo-router";
import { Image } from "expo-image";

import { useColorScheme } from "react-native";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  return (
    <TView className="flex-1 gap-2 bg-background items-center justify-center min-h-screen ">
      {colorScheme &&
        (colorScheme === "dark" ? (
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              width: 200,
              height: 200,
            }}
            contentFit="cover"
          />
        ) : (
          <Image
            source={require("../assets/images/logo-dark.png")}
            style={{
              width: 200,
              height: 200,
            }}
            contentFit="cover"
          />
        ))}
      <TText type="title" className="text-3xl text-text">
        Welcome to Anchor
      </TText>
      <TButton
        type="secondary"
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      >
        <TText type={"secondary"}>Login</TText>
      </TButton>

      <TButton
        type="primary"
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
      >
        <TText type={"secondary"}>Register</TText>
      </TButton>
    </TView>
  );
}
