import { Post } from "@/constants/types"
import { Image } from "expo-image";
import { Building2, Heart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native"
import { TText } from "../themedComponents/themed-text";
import PostViewFull from "./postViewFull";
import PostViewSmall from "./postSmall";

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
        <PostViewFull
        post={{
          authorName : post.authorName,
          body : post.body,
          imageUrl : post.imageUrl
        }}
        />
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
        <PostViewSmall
          imageUrl={post.imageUrl}
        />
      </TouchableOpacity>
    )}
    </View>
  )
}
