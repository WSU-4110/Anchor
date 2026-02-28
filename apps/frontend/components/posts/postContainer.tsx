import { Post } from "@/constants/types"
import { Image } from "expo-image";
import { Building2, Heart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native"
import { TText } from "../themedComponents/themed-text";

interface postContainer{
  changeView : boolean,
  setChangeView : React.Dispatch<React.SetStateAction<boolean>>;
  post : Partial<Post>
}

/*
Here we are using composition to minimize the
components we need for posts
*/
export default function PostContainer({post, changeView, setChangeView}: postContainer){
  return (
    <View>
    {changeView ? (
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

        <View className="flex flex-row justify-between mt-2 mx-2 ">
          <View className="flex flex-row gap-2 items-center ">
            <Building2 color="#aac7b6" />
            <TText className="text-md text-white">{post.authorName}</TText>
          </View>
          <Heart className="pr-2" color="#aac7b6" />
        </View>

        <View className="mx-2">
          <TText className="text-md text-white">{post.body}</TText>
        </View>
      </TouchableOpacity>
    ):(
      <TouchableOpacity
        onPress={() => {
          setChangeView(!changeView);
        }}
        className="border-2 border-white/15 p-1"
        style={{
          width: 110,
          height: 125,
          overflow: "hidden",
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
      </TouchableOpacity>
    )}
    </View>
  )
}
