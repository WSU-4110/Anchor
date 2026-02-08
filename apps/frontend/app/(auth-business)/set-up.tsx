import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TView } from "@/components/themedComponents/themed-view";
import { useOrganizationList } from "@clerk/clerk-expo"; // Removed useUser if not used
import { router } from "expo-router";
import { ArrowBigLeft } from "lucide-react-native";

type SetUpProps = {
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
};
export default function SetUp({ businessName, setBusinessName }: SetUpProps) {
  const orgList = useOrganizationList();

  if (!orgList || !orgList.isLoaded) {
    return (
      <TView className="flex-1 justify-center items-center">
        <TText>Initializing Organization Manager...</TText>
      </TView>
    );
  }

  const { createOrganization } = orgList;

  const handleCreateBusiness = async () => {
    if (!businessName || !createOrganization) return;
    try {
      await createOrganization({ name: businessName });
      router.replace("/(business)");
    } catch (err) {
      console.error("Org Creation Error", err);
    }
  };

  return (
    <TView className="flex-1 items-center justify-center p-6">
    <TView className="flex flex-row gap-24 mb-8 mt-4">
      <ArrowBigLeft
        color="white"
        onPress={() => {
          router.back();
        }}
      />
    </TView>
      <TText>Finish setting up your business</TText>
      <TTextInput
        type="default"
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        className="w-full my-4 border p-2"
      />
      <TButton type="primary" onPress={handleCreateBusiness}>
        <TText>Create Business Account</TText>
      </TButton>
    </TView>
  );
}
