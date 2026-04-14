import { FlatList, Text, View } from "react-native";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";
import PostViewFull from "@/components/posts/postViewFull";
import PostViewSmall from "@/components/posts/postSmall";
import { useState } from "react";

const demoPosts = [
  {
    _id: "1",
    authorName: "Demo Biz 1",
    imageUrl:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Title 1",
    body: "Body 1.",
  },
  {
    _id: "2",
    authorName: "Demo Biz 2",
    imageUrl:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Title 2",
    body: "Body 2.",
  },
  {
    _id: "3",
    authorName: "Demo Biz 3",
    imageUrl:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Title 3",
    body: "Body 3.",
  },
  {
    _id: "4",
    authorName: "Demo Biz 4",
    imageUrl:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Title 4",
    body: "Body 4.",
  },
];

export default function SavedPostsPage() {
const [changeView, setChangeView] = useState<boolean>(false);

  return (
    <TView className="flex-1 p-12 ">
      <View className="items-center justify-center">
        <TText type="title" className="text-2xl font-bold mb-4 mt-4">
          Saved Posts
        </TText>
      </View>

      <View className="items-center"> 
        <FlatList
          key={`flatlist-${changeView === false ? 3 : 1}`}
          data={demoPosts}
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
                    width={300}
                    height={250}
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
      </View>
    </TView>
  );
}