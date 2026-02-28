import AddPost from "@/components/businessComponents/addPost";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import useOrgDetails from "@/hooks/use-org-details";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";
import { TButton } from "@/components/themedComponents/themed-button";
import { useGetOwnBusinessPosts } from "@/convex/queries";
import { Loader2 } from "lucide-react-native";
import PostViewSmall from "@/components/posts/postSmall";
import { useState } from "react";
import PostViewFull from "@/components/posts/postViewFull";

export default function HomeScreen() {
  const { logoUrl, name, id } = useOrgDetails();
  const { data, isLoading, isError, error } = useGetOwnBusinessPosts(id);
  const [changeView, setChangeView] = useState<boolean>(false);

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

      <TView className="flex flex-row gap-4 items-center justify-center ">
        <View className="flex flex-row  gap-8">
          <View className="flex flex-col items-center">
            <TText>14</TText>
            <TText>Posts</TText>
          </View>
          <View className="flex flex-col items-center">
            <TText>20</TText>

            <TText>Followers</TText>
          </View>
          <View className="flex flex-col items-center">
            <TText>0</TText>
            <TText>Events</TText>
          </View>
        </View>
      </TView>
      <TView className="flex flex-row gap-2 mb-2">
        <TButton
          style={{
            width: 150,
            height: 35,
          }}
          onPress={() => {}}
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
          onPress={() => {}}
          type="secondary"
        >
          <View className="flex flex-row items-center">
            <Text>Share Profile</Text>
          </View>
        </TButton>
      </TView>
      <View>
        {isLoading && (
          <View className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </View>
        )}
      </View>

      <View>
        {isError && (
          <View className="flex items-center justify-center">
            <Text>There was an error: {String(error)}</Text>
          </View>
        )}
      </View>
      <View>
        {data && (
          <FlatList
            key={`flatlist-${changeView === false ? 3 : 1}`}
            data={data}
            renderItem={({ item }) => (
              <View>
                {changeView === false ? (
                  <PostViewSmall
                    imageUrl={item.imageUrl}
                    changeView={changeView}
                    setChangeView={setChangeView}
                  />
                ) : (
                  <View>
                    <PostViewFull
                      post={{
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
              </View>
            )}
            numColumns={changeView === false ? 3 : 1}
          />
        )}
      </View>
    </TView>
  );
}
