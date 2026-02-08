import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { LogOut } from "lucide-react-native";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import useOrgDetails from "@/hooks/use-org-details";
import { Image } from "expo-image";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  const  {name , logoUrl} = useOrgDetails();

  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.dismissAll();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TView className="flex-1 items-center  p-24 w-full">

      <TText type="title">
        Welcome {name}
      </TText>
      <Image
      source={logoUrl}
      className="cover rounded-xl"
      style={{
        width : 60,
        height : 60,
        borderRadius: 20
      }}
      />
     <TView className="mt-24 flex items-center">
       <TText type="default">
         Test Log Out
       </TText>
       <LogOut
         color={"white"}
         onPress={() => {
           handleSignOut();
         }}
       />
     </TView>

    </TView>
  );
}
