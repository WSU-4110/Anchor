import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TanStackQueryProvider from "@/providers/tanStackProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <TanStackQueryProvider>
          <ClerkLoaded>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }} />
            </GestureHandlerRootView>
          </ClerkLoaded>
        </TanStackQueryProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
