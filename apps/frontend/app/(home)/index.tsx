import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text } from "react-native";

export default function HomeScreen() {
  const tasks = useQuery(api.tasks.get);

  return (
    <TView className="flex-1 items-center justify-center">
      <TText type="default">This is the home screen</TText>
      {tasks?.map(({ _id, text }) => (
        <Text className="text-white text-md" key={_id}>
          {text}
        </Text>
      ))}
    </TView>
  );
}
