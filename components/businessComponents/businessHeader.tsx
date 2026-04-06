import { TView } from "../themedComponents/themed-view";
import { TText } from "../themedComponents/themed-text";
import { useGetBusiness } from "@/convex/queries";
import { View } from "react-native";
import Loader from "../loader";
import ErrorDisplay from "../error-display";
import { useState } from "react";

type BusinessHeaderProps = {
  id: string;
  posts: number;
};
export default function BusinessHeader({ id, posts }: BusinessHeaderProps) {
  const { data, isLoading, isError, error } = useGetBusiness(id);
  const [onClose, setOnClose] = useState<boolean>(false);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        errorMessage={String(error)}
        setOnClose={setOnClose}
        onClose={onClose}
      />
    );
  }

  return (
    <View>
      {data && (
        <View className="flex flex-row gap-4 items-center justify-center ">
          <View className="flex flex-row  gap-8">
            <View className="flex flex-col items-center">
              <TText>{posts}</TText>
              <TText>Posts</TText>
            </View>
            <View className="flex flex-col items-center">
              <TText>{data.businessFollowers.length}</TText>
              <TText>Followers</TText>
            </View>
            <View className="flex flex-col items-center">
              <TText>0</TText>
              <TText>Events</TText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
