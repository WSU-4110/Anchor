import { Spacer } from "@/components/spacer";
import { TScrollView } from "@/components/themedComponents/themed-scrollView";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const light = colorScheme === "light";

  const colorMode = light ? "dark" : "light";
  return (
    <TView className="flex-1 p-12">
      {user && (
        <View>
          <TView className="flex flex-row justify-between items-center w-full">
            <TView className="w-16 h-16 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
              <Image
                source={user.imageUrl}
                className="object-cover rounded-full"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 40,
                }}
              />
            </TView>

            <TView className="mb-4">
              <TText>Your Feed</TText>
            </TView>
          </TView>
          <TScrollView className="mt-24 gap-8 w-full">
            <View className="border border-white/30 p-4 mb-4 rounded-xl">
              <MotiView
                transition={{
                  type: "timing",
                }}
                animate={{
                  backgroundColor: light ? "#3c6e71" : "#061f20",
                }}
              >
                <Skeleton
                  colorMode={colorMode}
                  radius="round"
                  height={75}
                  width={75}
                />
                <Spacer />
                <Skeleton colorMode={colorMode} width={250} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
            </View>

            <View className="border border-white/30 p-4 rounded-xl">
              <MotiView
                transition={{
                  type: "timing",
                }}
                animate={{
                  backgroundColor: light ? "#3c6e71" : "#061f20",
                }}
              >
                <Skeleton
                  colorMode={colorMode}
                  radius="round"
                  height={75}
                  width={75}
                />
                <Spacer />
                <Skeleton colorMode={colorMode} width={250} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
            </View>

            <View className="border border-white/30 p-4 mt-4 rounded-xl">
              <MotiView
                transition={{
                  type: "timing",
                }}
                animate={{
                  backgroundColor: light ? "#3c6e71" : "#061f20",
                }}
              >
                <Skeleton
                  colorMode={colorMode}
                  radius="round"
                  height={75}
                  width={75}
                />
                <Spacer />
                <Skeleton colorMode={colorMode} width={250} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
            </View>
          </TScrollView>
        </View>
      )}
    </TView>
  );
}
