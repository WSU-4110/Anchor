import AddPost from "@/components/businessComponents/addPost";
import { TView } from "@/components/themedComponents/themed-view";
import useOrgDetails from "@/hooks/use-org-details";
import { Image } from "expo-image";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TButton } from "@/components/themedComponents/themed-button";
import { useGetOwnBusinessPosts } from "@/convex/queries";
import PostViewSmall from "@/components/posts/postSmall";
import { useState } from "react";
import PostViewFull from "@/components/posts/postViewFull";
import BusinessHeader from "@/components/businessComponents/businessHeader";
import { useUser } from "@clerk/clerk-expo";
import Loader from "@/components/loader";
import ErrorDisplay from "@/components/error-display";
import { useRouter } from "expo-router";
import { handleShare } from "@/lib/helpers";
import { useDeletePost } from "@/convex/mutations";

export default function HomeScreen() {
  const { logoUrl, name, id } = useOrgDetails();
  const { user } = useUser();
  const { data, isLoading, isError, error } = useGetOwnBusinessPosts(id);
  const [changeView, setChangeView] = useState<boolean>(false);
  const [onClose, setOnClose] = useState<boolean>(false);
  const router = useRouter();
  const deletePost = useDeletePost();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        errorMessage={String(error)}
        setOnClose={setOnClose}
        onClose={onClose}
      />
    );
  }

  return (
    <TView className="flex-1 p-12 ">
      <TView className="flex flex-row justify-between items-center w-full">
        <TView className="w-16 h-16 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
          <Image
            source={logoUrl}
            className="object-cover rounded-full"
            style={{
              width: 35,
              height: 35,
              borderRadius: 40,
            }}
          />
        </TView>

        <TView className="mb-4">
          <AddPost authorName={name} authorId={id} />
        </TView>
      </TView>

      {data && (
        <View>
          {user && <BusinessHeader id={user.id} posts={data.length} />}

          <TView className="flex flex-row gap-2 mb-2">
            <TButton
              style={{
                width: 150,
                height: 35,
              }}
              onPress={() => {
                router.push("/(business)/settings");
              }}
              type="secondary"
            >
              <View className="flex flex-row items-center">
                <Text>Edit Profile</Text>
              </View>
            </TButton>

            <TButton
              style={{
                width: 150,
                height: 35,
              }}
              onPress={() => {
                handleShare(name, `Check out ${name} on Anchor!`);
              }}
              type="secondary"
            >
              <View className="flex flex-row items-center">
                <Text>Share Profile</Text>
              </View>
            </TButton>
          </TView>

          <FlatList
            key={`flatlist-${changeView === false ? 3 : 1}`}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => {
                  Alert.alert(
                    "Delete Post",
                    "Are you sure you want to delete this post?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                          try {
                            await deletePost.mutateAsync({ id: item._id });
                          } catch (err) {
                            console.error("Failed to delete post", err);
                          }
                        },
                      },
                    ],
                  );
                }}
              >
                {changeView === false ? (
                  <PostViewSmall
                    imageUrl={item.imageUrl}
                    likesCount={item.likes?.length ?? 0}
                    changeView={changeView}
                    setChangeView={setChangeView}
                  />
                ) : (
                  <View>
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
                      changeView={changeView}
                      setChangeView={setChangeView}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
            numColumns={changeView === false ? 3 : 1}
          />
        </View>
      )}
    </TView>
  );
}