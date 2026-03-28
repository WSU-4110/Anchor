import "../global.css";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import { TButton } from "@/components/themedComponents/themed-button";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useColorScheme, View } from "react-native";
import {
  ArrowRight,
  BriefcaseBusiness,
  User,
  LucideIcon,
} from "lucide-react-native";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleNavigation = (type: "personal" | "business") => {
    router.push(`/(auth)/sign-up?type=${type}`);
  };

  return (
    <TView className="flex-1 bg-background items-center pt-24 px-6">
      <Image
        source={
          isDark
            ? require("../assets/images/logo.png")
            : require("../assets/images/logo-dark.png")
        }
        style={{ width: 120, height: 120, marginBottom: 20 }}
        contentFit="contain"
      />

      <TText type="title" className="text-3xl mb-12">
        Welcome to Anchor
      </TText>

      <TView className="flex-row gap-4 justify-center w-full">
        <AccountTypeCard
          title="Personal Account"
          icon={User}
          isDark={isDark}
          onPress={() => handleNavigation("personal")}
          type="secondary"
        />

        <AccountTypeCard
          title="Business Account"
          icon={BriefcaseBusiness}
          isDark={isDark}
          onPress={() => handleNavigation("business")}
          type="primary"
        />
      </TView>

      <TView className="mt-auto mb-10 flex-row gap-1">
        <TText>Already have an account?</TText>
        <TText
          onPress={() => router.push("/(auth)/sign-in")}
          className="font-bold"
          style={{ color: isDark ? "#0a7ea4" : "#06377a" }}
        >
          Sign in
        </TText>
      </TView>
    </TView>
  );
}

/**
 * Reusable Card Component to keep the main render clean
 */
function AccountTypeCard({
  title,
  icon: Icon,
  isDark,
  onPress,
  type,
}: {
  title: string;
  icon: LucideIcon;
  isDark: boolean;
  onPress: () => void;
  type: "primary" | "secondary";
}) {
  const iconBg = isDark
    ? type === "primary"
      ? "#b5e6c9"
      : "#061f20"
    : type === "primary"
      ? "#061f20"
      : "#b5e6c9";
  const iconColor = isDark
    ? type === "primary"
      ? "#061f20"
      : "#aac7b6"
    : type === "primary"
      ? "#b5e6c9"
      : "#061f20";

  return (
    <TButton
      style={{ width: 165, paddingVertical: 20 }}
      type={type}
      onPress={onPress}
    >
      <TView
        style={{ backgroundColor: iconBg }}
        className="w-16 h-16 rounded-full items-center justify-center mb-4"
      >
        <Icon color={iconColor} size={32} />
      </TView>

      <TText
        type="secondary"
        className="text-center mb-4 text-sm font-semibold"
      >
        {title}
      </TText>

      <View className="flex-row items-center justify-center gap-1">
        <TText type="link" className="text-xs">
          Continue
        </TText>
        <ArrowRight size={14} color={isDark ? "#0a7ea4" : "#06377a"} />
      </View>
    </TButton>
  );
}
