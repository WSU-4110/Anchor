import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TanStackQueryProvider from "@/providers/tanStackProvider";
import { Text, View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 24,
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            }}
          >
            <Text
              style={{
                color: colorScheme === "dark" ? "#fff" : "#000",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Missing Clerk publishable key
            </Text>
            <Text
              style={{
                color: colorScheme === "dark" ? "#ccc" : "#444",
                fontSize: 14,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to .env.local, then restart Expo.
            </Text>
          </View>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <TanStackQueryProvider>
            <ClerkLoaded>
              <Stack screenOptions={{ headerShown: false }} />
            </ClerkLoaded>
          </TanStackQueryProvider>
        </ClerkProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}