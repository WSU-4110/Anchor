import { PostViewFullProps } from "@/constants/types";
import { Image } from "expo-image";
import { Building2, Heart, Share2, Bookmark } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { TText } from "../themedComponents/themed-text";
import { useState, useEffect } from "react";
import { handleShare } from "@/lib/helpers";

import { useSave, useUnsave } from "@/convex/mutations";
import { useGetUser, useIsSaved } from "@/convex/queries";

export default function PostViewFull({
  post,
  changeView,
  setChangeView,
  width,
  height,
}: PostViewFullProps) {
  const [sharePost, setSharedPost] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  
  /*
  const { data: user, isLoading: userLoading } = useGetUser();
  const userKey = user?._id;

  const isBookmarkedDB = useIsSaved(post.authorId, userKey);

  const [isSavedLocal, setIsSavedLocal] = useState<boolean | undefined>(undefined);

  const { mutate: savePost } = useSave();
  const { mutate: unsavePost } = useUnsave();

  useEffect(() => {
    setIsSavedLocal(isBookmarkedDB);
  }, [isBookmarkedDB]);

  const handleToggleSave = async () => {
    if (!userKey) return;

    const currentlySaved = isSavedLocal ?? isBookmarkedDB;
    const nextState = !currentlySaved;

    // Update UI immediately
    setIsSavedLocal(nextState);

    try {
      if (nextState) {
        await savePost({ postId: post._id, userKey });
      } else {
        await unsavePost({ postId: post._id, userKey });
      }
    } catch (error) {
      // Revert if the database call fails
      setIsSavedLocal(currentlySaved);
      console.error("Save/Unsave failed:", error);
    }
  };

  const showAsSaved = isSavedLocal ?? isBookmarkedDB;
  */


  return (
    <View>
      <TouchableOpacity
        testID="change-view-full"
        onPress={() => {
          setChangeView(!changeView);
        }}
        className="border-2 border-white/15 p-1 mb-2 w-auto"
        style={{
          width: width,
          height: height,
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

          <View testID="container" className="flex flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => {
                setSave(!save);
              }}
              className="z-50"
            >
              <View>
                <Bookmark color="#aac7b6" fill={save ? "green" : ""} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              testID="share-post-container"
              onPress={() => {
                setSharedPost(!sharePost);
              }}
              className="z-50"
            >
              <View testID="heart-icon">
                <Heart color="#aac7b6" fill={sharePost ? "red" : ""} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              testID="share-post"
              onPress={() => {
                handleShare(post.title, post.body);
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
