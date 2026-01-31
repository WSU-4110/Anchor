import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { LogOut } from "lucide-react-native";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.dismissAll();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TView className="flex-1 items-center justify-center">
      <TText>Welcome to the settings screen</TText>
      <LogOut
        color={"white"}
        onPress={() => {
          handleSignOut();
        }}
      />
    </TView>
  );
}
