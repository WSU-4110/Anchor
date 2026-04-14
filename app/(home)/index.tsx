import PostViewFull from "@/components/posts/postViewFull";
import PublicBusinessAccount from "@/components/businessComponents/publicBusinessAccount";
import { TScrollView } from "@/components/themedComponents/themed-scrollView";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { usePaginatedQuery } from "convex/react";
import { useGetAllBusinesses, useGetUser } from "@/convex/queries";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { useMemo, useState } from "react";

export default function HomeScreen() {
  const { user } = useUser();
  const { data: currentUser } = useGetUser();
  const { data: businesses } = useGetAllBusinesses();

  const { results, status } = usePaginatedQuery(
    api.posts.getFeed,
    {},
    {
      initialNumItems: 12,
    },
  );

  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null as any);

  const businessMap = useMemo(() => {
    const map = new Map<string, any>();
    (businesses ?? []).forEach((business) => {
      map.set(business.businessName, business);
    });
    return map;
  }, [businesses]);

  return (
    <TView className="flex-1 p-12">
      {user && (
        <View>
          <TView className="flex flex-row justify-between items-center w-full">
            <TView className="w-16 h-16 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4">
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

          <TScrollView className="mt-24 gap-8 pb-4 w-full">
            <View>
              {status === "LoadingFirstPage" ? (
                <TText>Loading posts...</TText>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <TouchableOpacity
                    key={String(item._id)}
                    activeOpacity={0.9}
                    onPress={() => {
                      const business = businessMap.get(item.authorName);
                      if (business) {
                        setSelectedBusiness(business);
                        setOpen(true);
                      }
                    }}
                  >
                    <PostViewFull
                      width={300}
                      height={250}
                      post={{
                        _id: item._id,
                        likes: item.likes ?? [],
                        authorName: item.authorName,
                        imageUrl: item.imageUrl,
                        title: item.title,
                        body: item.body,
                      }}
                      changeView={true}
                      setChangeView={() => {}}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <TText>No posts yet.</TText>
              )}
            </View>
          </TScrollView>
        </View>
      )}

      {currentUser && selectedBusiness && (
        <PublicBusinessAccount
          userId={currentUser.clerkUserId}
          userFollowing={currentUser.following}
          userView={true}
          open={open}
          setOpen={setOpen}
          business={selectedBusiness}
        />
      )}
    </TView>
  );
}