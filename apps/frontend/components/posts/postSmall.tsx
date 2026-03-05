import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
type PostViewSmallProps = {
  imageUrl: string;
  setChangeView: React.Dispatch<React.SetStateAction<boolean>>;
  changeView: boolean;
};
export default function PostViewSmall({
  imageUrl,
  setChangeView,
  changeView,
}: PostViewSmallProps) {
  return (
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
        source={imageUrl}
      />
    </TouchableOpacity>
  );
}
