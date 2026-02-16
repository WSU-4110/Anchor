import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";

export default function HomeScreen() {
  return (
    <TView className="flex-1 items-center justify-center">
      <TText type="default">This is the business home screen</TText>
    </TView>
  );
}
