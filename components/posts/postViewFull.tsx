import { PostViewFullProps } from "@/constants/types";
import { Image } from "expo-image";
import { Bookmark, Building2, Heart, Share2 } from "lucide-react-native";
import { TouchableOpacity, View, Text } from "react-native";
import { TText } from "../themedComponents/themed-text";
import { useEffect, useMemo, useState } from "react";
import { handleShare } from "@/lib/helpers";
import {
  useSavePost,
  useToggleLikePost,
  useUnsavePost,
} from "@/convex/mutations";
import { useUser } from "@clerk/clerk-expo";
import { useIsSavedPost } from "@/convex/queries";

export default function PostViewFull({
  post,
  changeView,
  setChangeView,
  width,
  height,
}: PostViewFullProps) {
  const { user } = useUser();

  const toggleLike = useToggleLikePost();
  const savePost = useSavePost();
  const unsavePost = useUnsavePost();

  const isRealPostId = useMemo(() => {
    return !!post._id && typeof post._id !== "string"
      ? true
      : typeof post._id === "string" && !post._id.startsWith("demo-");
  }, [post._id]);

  const [likeCount, setLikeCount] = useState<number>(post.likes?.length ?? 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { data: isSaved } = useIsSavedPost(
    isRealPostId ? post._id : undefined,
    user?.id,
  );

  useEffect(() => {
    setLikeCount(post.likes?.length ?? 0);

    if (user && post.likes) {
      setIsLiked(post.likes.includes(user.id));
    } else {
      setIsLiked(false);
    }
  }, [user, post.likes]);

  const handleToggleLike = async () => {
    if (!user || !post._id || !isRealPostId) return;

    try {
      const newLikeCount = await toggleLike.mutateAsync({
        id: post._id as never,
        userId: user.id,
      });

      setIsLiked((prev) => !prev);
      setLikeCount(newLikeCount);
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  const handleToggleSave = async () => {
    if (!user || !post._id || !isRealPostId) return;

    try {
      if (isSaved) {
        await unsavePost.mutateAsync({
          postId: post._id as never,
          userKey: user.id,
        });
      } else {
        await savePost.mutateAsync({
          postId: post._id as never,
          userKey: user.id,
        });
      }
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  return (
    <View>
      <TouchableOpacity
        testID="change-view-full"
        onPress={() => {
          setChangeView(!changeView);
        }}
        className="border-2 border-white/15 p-1 mb-2 w-auto"
        style={{
          width,
          height,
          overflow: "scroll",
          borderRadius: 18,
        }}
      >
        <Image
          testID="image-test-full-id"
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
              testID="like-post"
              onPress={handleToggleLike}
              className="flex flex-row items-center gap-1"
              disabled={!isRealPostId}
            >
              <Heart color="#aac7b6" fill={isLiked ? "red" : ""} />
              <Text style={{ color: "#aac7b6" }}>{likeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleToggleSave}
              disabled={!isRealPostId}
            >
              <Bookmark color="#aac7b6" fill={isSaved ? "#aac7b6" : ""} />
            </TouchableOpacity>

            <TouchableOpacity
              testID="share-post"
              onPress={() => {
                handleShare(post.title ?? "", post.body ?? "");
              }}
            >
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