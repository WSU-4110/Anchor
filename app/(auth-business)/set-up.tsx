import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TView } from "@/components/themedComponents/themed-view";
import { Business } from "@/constants/types";
import { useCreateBusiness } from "@/convex/mutations";
import { useOrganizationList } from "@clerk/clerk-expo"; // Removed useUser if not used
import { router } from "expo-router";
import { ArrowBigLeft } from "lucide-react-native";
import { Text } from "react-native";

type SetUpProps = {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
  userId: string;
};
export default function SetUp({ business, setBusiness, userId }: SetUpProps) {
  const orgList = useOrganizationList();

  const createBusiness = useCreateBusiness();
  if (!orgList || !orgList.isLoaded) {
    return (
      <TView className="flex-1 justify-center items-center">
        <TText>Initializing Organization Manager...</TText>
      </TView>
    );
  }

  const { createOrganization } = orgList;

  const handleCreateBusiness = async () => {
    if (!business.businessName || !createOrganization) return;
    try {
      await createOrganization({ name: business.businessName });

      createBusiness.mutateAsync({
        businessName: business.businessName,
        businessLocation: business.businessLocation,
        businessId: business.businessId,
        created_by: userId,
        businessFollowers: business.businessFollowers,
      });
      router.replace("/(business)");
    } catch (err) {
      console.error("Org Creation Error", err);
    }
  };
  return (
    <TView className="flex-1 items-center justify-center p-6 ">
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
        value={business.businessName}
        style={{
          color: "white",
        }}
        placeholderTextColor="#666666"
        onChangeText={(businessName) => {
          setBusiness({ ...business, businessName: businessName });
        }}
        className="w-full my-4 border p-4 "
      />

      <TTextInput
        type="default"
        placeholder="Business Location"
        value={business.businessLocation}
        placeholderTextColor="#666666"
        onChangeText={(businessLocation) => {
          setBusiness({
            ...business,
            businessLocation: businessLocation,
          });
        }}
        className="w-full my-4 border p-2"
      />
      <TButton type="primary" onPress={handleCreateBusiness}>
        <TText type="secondary">Add Business</TText>
      </TButton>
    </TView>
  );
}
