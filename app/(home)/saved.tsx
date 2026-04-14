import PostViewFull from "@/components/posts/postViewFull";
import Loader from "@/components/loader";
import ErrorDisplay from "@/components/error-display";
import { TScrollView } from "@/components/themedComponents/themed-scrollView";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { useGetSavedPosts, useGetUser } from "@/convex/queries";
import { View } from "react-native";

export default function SavedPostsScreen() {
  const { data: currentUser } = useGetUser();
  const {
    data: savedPosts,
    isLoading,
    isError,
    error,
  } = useGetSavedPosts(currentUser?.clerkUserId);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        errorMessage={String(error)}
        onClose={false}
        setOnClose={() => {}}
      />
    );
  }

  return (
    <TView className="flex-1 p-12">
      <View className="items-center justify-center mb-4 mt-4">
        <TText type="title" className="text-2xl font-bold">
          Saved Posts
        </TText>
      </View>

      <TScrollView className="gap-4 pb-4 w-full">
        {savedPosts && savedPosts.length > 0 ? (
          savedPosts.map((item: any) => (
            <View key={item._id}>
              <PostViewFull
                width={300}
                height={250}
                post={{
                  _id: item._id,
                  likes: item.likes,
                  authorName: item.authorName,
                  imageUrl: item.imageUrl,
                  title: item.title,
                  body: item.body,
                }}
                changeView={true}
                setChangeView={() => {}}
              />
            </View>
          ))
        ) : (
          <TText>No saved posts yet.</TText>
        )}
      </TScrollView>
    </TView>
  );
}