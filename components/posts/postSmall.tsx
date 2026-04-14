import { PostViewSmallProps } from "@/constants/types";
import { Image } from "expo-image";
import { TouchableOpacity, View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export default function PostViewSmall({
  imageUrl,
  likesCount = 0,
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
        width: 110,
        height: 125,
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

      {likesCount > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 4,
            left: 4,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 8,
            paddingHorizontal: 6,
            paddingVertical: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Heart
            size={12}
            color="#ffffff"
            fill="#e63946"
            style={{ marginRight: 2 }}
          />
          <Text style={{ color: "#ffffff", fontSize: 10 }}>{likesCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}