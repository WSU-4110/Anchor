import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function TabLayout() {
  return (
    <ConvexProvider client={convex}>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Icon sf="gear" drawable="custom_settings_drawable" />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ConvexProvider>
  );
}
