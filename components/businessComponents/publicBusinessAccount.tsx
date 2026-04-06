import { Image } from "expo-image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Alert, FlatList, Modal, Text, View } from "react-native";
import { Business } from "@/constants/types";
import { useGetBusinessPosts } from "@/convex/queries";
import PostViewSmall from "../posts/postSmall";
import { UserPlus, UserRoundMinus, XIcon } from "lucide-react-native";
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

type PublicBusinessProps = {
  userFollowing: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  business: Business;
  userView: boolean;
  userId: string;
};

export default function PublicBusinessAccount({
  open,
  setOpen,
  business,
  userFollowing,
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

  const handleFollowBusiness = () => {
    const businessName = business.businessName;
    addFollower.mutate({ userId });
    followBusiness.mutate({ userId, businessName });
  };
  const handleUnFollowBusiness = () => {
    const businessName = business.businessName;
    unAddFollower.mutate({ userId });
    unFollowBusiness.mutate({ userId, businessName });
  };
  return (
    <>
      {data && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setOpen(!open);
          }}
        >
          <View className="flex-1 pt-24 px-8 items-center border-1 border-black rounded-3xl w-full">
            <View className="p-5 rounded-3xl bg-black/10 border border-white/15 bg-white w-[300px]">
              <View className="flex flex-row items-center justify-between">
                <XIcon
                  color={"red"}
                  onPress={() => {
                    setOpen(!open);
                  }}
                />
                {isFollowing ? (
                  <UserRoundMinus
                    onPress={handleUnFollowBusiness}
                    color={"red"}
                  />
                ) : (
                  <View>
                    <UserPlus onPress={handleFollowBusiness} />
                  </View>
                )}
              </View>
              <View className="flex-col items-center justify-center mb-2  gap-2">
                <View className="w-24 h-24 rounded-full border-1 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
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
                <Text className="text-2xl font-bold">
                  {business.businessName}
                </Text>
              </View>
              <BusinessHeader posts={data.length} id={business.created_by} />

              <View className="flex ml-2">
                <FlatList
                  key={`flatlist-${changeView === false ? 3 : 1}`}
                  data={data}
                  renderItem={({ item }) => (
                    <View>
                      {changeView === false ? (
                        <PostViewSmall
                          imageUrl={item.imageUrl}
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
                          }}
                          changeView={changeView}
                          setChangeView={setChangeView}
                        />
                      )}
                    </View>
                  )}
                  numColumns={changeView === false ? 2 : 1}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
