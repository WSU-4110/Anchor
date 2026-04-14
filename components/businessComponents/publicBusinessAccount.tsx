import { Image } from "expo-image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { Business } from "@/constants/types";
import { useGetBusinessPosts } from "@/convex/queries";
import PostViewSmall from "../posts/postSmall";
import ErrorDisplay from "../error-display";
import PostViewFull from "../posts/postViewFull";
import Loader from "../loader";
import BusinessHeader from "./businessHeader";
import {
  useFollowBusiness,
  useUnFollowBusiness,
  useGetFollowed,
  useGetUnFollowed,
} from "@/convex/mutations";
import { XIcon } from "lucide-react-native";

type PublicBusinessProps = {
  userFollowing: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  business: Business;
  userView: boolean;
  userId: string;
};

export default function PublicBusinessAccount({
  userFollowing,
  open,
  setOpen,
  business,
  userId,
}: PublicBusinessProps) {
  const { data, isLoading, isError, error } = useGetBusinessPosts(
    business.businessName,
  );

  const followBusiness = useFollowBusiness();
  const addFollower = useGetFollowed();
  const unAddFollower = useGetUnFollowed();
  const unFollowBusiness = useUnFollowBusiness();

  const isFollowing = useMemo(() => {
    return userFollowing.includes(business.businessName);
  }, [business.businessName, userFollowing]);

  const [changeView, setChangeView] = useState<boolean>(false);
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

  const handleFollowBusiness = async () => {
    try {
      await addFollower.mutateAsync({
        businessId: business.businessId,
        userId,
      });

      await followBusiness.mutateAsync({
        userId,
        businessName: business.businessName,
      });
    } catch (err) {
      console.log("Error following business:", err);
    }
  };

  const handleUnFollowBusiness = async () => {
    try {
      await unAddFollower.mutateAsync({
        businessId: business.businessId,
        userId,
      });

      await unFollowBusiness.mutateAsync({
        userId,
        businessName: business.businessName,
      });
    } catch (err) {
      console.log("Error unfollowing business:", err);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setOpen(false);
      }}
    >
      <View className="flex-1 pt-24 px-8 items-center border-1 border-black rounded-3xl w-full">
        <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white w-[320px] max-h-[85%]">
          <View className="flex flex-row items-center justify-between mb-2">
            <XIcon
              color={"red"}
              onPress={() => {
                setOpen(false);
              }}
            />

            <TouchableOpacity
              onPress={isFollowing ? handleUnFollowBusiness : handleFollowBusiness}
              style={{
                backgroundColor: isFollowing ? "#ef4444" : "#16a34a",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col items-center justify-center mb-2 gap-2">
            <View className="w-24 h-24 rounded-full border-1 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4">
              <Image
                source={business.businessLogo || ""}
                className="object-cover rounded-full"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 40,
                }}
              />
            </View>
            <Text className="text-2xl font-bold text-center">
              {business.businessName}
            </Text>
            <Text className="text-center text-gray-600">
              {business.businessLocation}
            </Text>
          </View>

          <BusinessHeader posts={data?.length ?? 0} id={business.created_by} />

          <View className="flex ml-2 mt-3">
            <FlatList
              key={`flatlist-${changeView === false ? 2 : 1}`}
              data={data ?? []}
              renderItem={({ item }) => (
                <View>
                  {changeView === false ? (
                    <PostViewSmall
                      imageUrl={item.imageUrl}
                      likesCount={item.likes?.length ?? 0}
                      changeView={changeView}
                      setChangeView={setChangeView}
                    />
                  ) : (
                    <PostViewFull
                      width={250}
                      height={250}
                      post={{
                        authorName: item.authorName,
                        imageUrl: item.imageUrl,
                        title: item.title,
                        body: item.body,
                        _id: item._id,
                        likes: item.likes,
                      }}
                      changeView={changeView}
                      setChangeView={setChangeView}
                    />
                  )}
                </View>
              )}
              numColumns={changeView === false ? 2 : 1}
              ListEmptyComponent={
                <Text className="text-center text-gray-600 mt-2">
                  No posts yet.
                </Text>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}