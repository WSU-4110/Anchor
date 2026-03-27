import { Post } from "@/constants/types";
import { Image } from "expo-image";
import { Building2, Heart, Share2 } from "lucide-react-native";
import { Share, TouchableOpacity, View } from "react-native";
import { TText } from "../themedComponents/themed-text";
import { useState } from "react";

type PostViewFullProps = {
  post: Partial<Post>;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
};

export default function PostViewFull({
  post,
  changeView,
  setChangeView,
}: PostViewFullProps) {
  const [sharePost, setSharedPost] = useState<boolean>(false);
  const handleShare = async () => {
    try {
      const placeholderLink = "https://example.com/post";
      await Share.share({
        message: `${post.title ?? ""}\n\n${post.body ?? ""}\n\n${placeholderLink}`,
      });
    } catch (error) {
      console.error("Error sharing post", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setChangeView(!changeView);
        }}
        className="border-2 border-white/15 p-1"
        style={{
          width: 300,
          height: 200,
          overflow: "scroll",
          borderRadius: 18,
        }}
      >
        <Image
          contentFit="cover"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: 18,
          }}
          source={post.imageUrl}
        />

        <View className="flex flex-row justify-between mt-2 mx-2">
          <View className="flex flex-row gap-2 items-center">
            <Building2 color="#aac7b6" />
            <TText className="text-md text-white">{post.authorName}</TText>
          </View>

          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => {
                setSharedPost(!sharePost);
              }}
              className="z-50"
            >
              <Heart color="#aac7b6" fill={sharePost ? "red" : ""} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Share2 color="#aac7b6" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-2">
          <TText className="text-md text-white">{post.body}</TText>
        </View>
      </TouchableOpacity>
    </View>
  );
}
