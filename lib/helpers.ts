import { router } from "expo-router";
import { Share } from "react-native";

export const handleNavigation = (type: "personal" | "business") => {
  router.push(`/(auth)/sign-up?type=${type}`);
};

export const handleShare = async (
  title: string | undefined,
  body: string | undefined,
) => {
  try {
    const placeholderLink = "https://example.com/post";
    await Share.share({
      message: `${title ?? ""}\n\n${body ?? ""}\n\n${placeholderLink}`,
    });
  } catch (error) {
    console.error("Error sharing post", error);
  }
};
