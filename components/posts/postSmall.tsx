import { PostViewSmallProps } from "@/constants/types";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

export default function PostViewSmall({
  imageUrl,
  setChangeView,
  changeView,
}: PostViewSmallProps) {
  return (
    <TouchableOpacity
      testID="change-view"
      onPress={() => {
        setChangeView(!changeView);
      }}
      className="border-2 border-white/15 p-1"
      style={{
        //width: 110,
        //height: 125,
        width: 88,
        height: 100,
        overflow: "hidden",
        borderRadius: 18,
      }}
    >
      <Image
        alt="Post Image"
        testID="image-test-id"
        contentFit="cover"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          borderRadius: 18,
        }}
        source={imageUrl}
      />
    </TouchableOpacity>
  );
}
