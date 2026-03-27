import { BusinessAccountFormProps, Business } from "@/constants/types";
import { useState } from "react";
import { TView } from "../themedComponents/themed-view";
import { TTextInput } from "../themedComponents/themed-textInput";
import { TButton } from "../themedComponents/themed-button";
import { TText } from "../themedComponents/themed-text";
import useOrgDetails from "@/hooks/use-org-details";
import { useUpdateBusiness } from "@/convex/mutations";

export default function EditBusinessAccount({
  user,
  data,
}: BusinessAccountFormProps) {
  const { name, logoUrl } = useOrgDetails();
  const updateBusiness = useUpdateBusiness();
  const [businessAccount, setBusinessAccount] = useState<Business>({
    businessName: data.businessName,
    businessLogo: data.businessLogo,
    businessLocation: data.businessLocation,
    businessId: data.businessId,
    created_by: data.created_by,
  });

  const clearForm = () => {
    setBusinessAccount({
      ...businessAccount,
      businessName: "",
      businessLogo: "",
      businessLocation: "",
    });
  };
  const handleUpdateBusinessAccount = async () => {
    try {
      const org = user.organizationMemberships[0].organization;

      await org.update({
        name: businessAccount.businessName,
      });

      const business: Business = {
        businessName: businessAccount.businessName || data.businessName,
        businessLocation:
          businessAccount.businessLocation || data.businessLocation,
        businessId: data.businessId,
        created_by: data.created_by,
      };
      updateBusiness.mutate({
        businessName: business.businessName,
        businessLocation: business.businessLocation,
        businessId: business.businessId,
        created_by: business.created_by,
        businessLogo: business.businessLogo,
      });
      clearForm();
    } catch (err) {
      console.log(`There was an error updating business account: ${err}`);
    }
  };

  return (
    <TView className=" w-full gap-2">
      <TText
        style={{
          fontSize: 12,
        }}
      >
        Business Name
      </TText>

      <TTextInput
        className="w-auto"
        type={"default"}
        autoCapitalize="none"
        value={businessAccount.businessName}
        placeholder={name || "Update Business Account Name"}
        placeholderTextColor="#666666"
        onChangeText={(e) => {
          setBusinessAccount({ ...businessAccount, businessName: e });
        }}
      />
      <TText
        style={{
          fontSize: 12,
        }}
      >
        Business Location
      </TText>

      <TTextInput
        className="w-auto"
        type={"default"}
        autoCapitalize="none"
        value={businessAccount.businessLocation}
        placeholder={
          data.businessLocation || "Update Business Account Location"
        }
        placeholderTextColor="#666666"
        onChangeText={(e) => {
          setBusinessAccount({ ...businessAccount, businessLocation: e });
        }}
      />
      <TView className="flex items-center justify-center">
        <TButton onPress={handleUpdateBusinessAccount} type="secondary">
          <TText type="secondary">Update Account</TText>
        </TButton>
      </TView>
    </TView>
  );
}
