import { Loader2 } from "lucide-react-native";
import { View } from "react-native";

type LoaderProps = {
  isLoading: boolean;
};
export default function Loader({ isLoading }: LoaderProps) {
  return (
    <View className="flex items-center justify-center">
      {isLoading && (
        <View>
          <Loader2 className="animate-spin" />
        </View>
      )}
    </View>
  );
}
