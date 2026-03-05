import PostViewFull from "@/components/posts/postViewFull";
import { TScrollView } from "@/components/themedComponents/themed-scrollView";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { usePaginatedQuery } from "convex/react";
import { Image } from "expo-image";
import { View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();

  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getFeed,
    {},
    {
      initialNumItems: 12,
    },
  );
  return (
    <TView className="flex-1 p-12">
      {user && (
        <View>
          <TView className="flex flex-row justify-between items-center w-full">
            <TView className="w-16 h-16 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
              <Image
                source={user.imageUrl}
                className="object-cover rounded-full"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 40,
                }}
              />
            </TView>

            <TView className="mb-4">
              <TText>Your Feed</TText>
            </TView>
          </TView>
          <TScrollView className="mt-24 gap-8 w-full">
            {results && (
              <View>
                {results.map((item) => (
                  <View key={item._id}>
                    <PostViewFull
                      post={{
                        authorName: item.authorName,
                        imageUrl: item.imageUrl,
                        title: item.title,
                        body: item.body,
                      }}
                      changeView
                      setChangeView={() => {}}
                    />
                  </View>
                ))}
              </View>
            )}
          </TScrollView>
        </View>
      )}
    </TView>
  );
}
