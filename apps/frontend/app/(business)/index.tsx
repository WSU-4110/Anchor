import AddPost from "@/components/businessComponents/addPost";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import useOrgDetails from "@/hooks/use-org-details";
import { Image } from "expo-image";
import { BriefcaseBusiness } from "lucide-react-native";
import { useColorScheme, Pressable } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Spacer } from "@/components/spacer";

export default function HomeScreen() {
  const { logoUrl } = useOrgDetails();
  const colorScheme = useColorScheme();
  const light = colorScheme === "light";

  const colorMode = light ? "dark" : "light";
  return (
    <TView className="flex-1 p-12 ">
      <TView className="flex flex-row justify-between items-center w-full">
        <TView className="w-16 h-16 rounded-full border-4 border-teal-500/30 items-center justify-center bg-teal-800/20 mb-4 ">
          <Image
            source={logoUrl}
            className="object-cover rounded-full"
            style={{
              width: 35,
              height: 35,
              borderRadius: 40,
            }}
          />
        </TView>

        <TView className="mb-4">
          <AddPost />
        </TView>
      </TView>

      <TView className="flex flex-row gap-4">
        <TView className="p-5 rounded-3xl bg-black/10 border border-white/15 w-1/2">
          <TView className="flex-row items-center mb-6 gap-2">
            <TText className="font-bold uppercase tracking-widest text-xs">
              Followers
            </TText>
          </TView>
          <TText
            style={{ fontSize: 25 }}
            className="inset-0 pl-4 text-3xl font-bold"
          >
            20
          </TText>
        </TView>
        <TView className="p-5 rounded-3xl bg-black/10 border border-white/15 w-1/2">
          <TView className="flex-row items-center mb-6 gap-2">
            <TText className="font-bold uppercase tracking-widest text-xs">
              Posts
            </TText>
          </TView>
          <TText
            style={{ fontSize: 25 }}
            className="inset-0 pl-4 text-3xl font-bold"
          >
            12
          </TText>
        </TView>
      </TView>
      <TView className="mt-4 w-[320px] ">
        <TView className="p-5 rounded-3xl bg-black/10 border border-white/15 ">
          <TView className="flex-row items-center mb-6 gap-2">
            <BriefcaseBusiness
              color={colorScheme === "dark" ? "#aac7b6" : "black"}
            />
            <TText className="font-bold uppercase tracking-widest text-xs">
              Profile Analytics
            </TText>
          </TView>
          <Pressable>
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
          </Pressable>
        </TView>
      </TView>
    </TView>
  );
}
