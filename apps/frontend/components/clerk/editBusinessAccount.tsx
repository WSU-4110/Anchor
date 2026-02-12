import { BusinessAccount, AccountFormProps } from "@/constants/types";
import { useState } from "react";
import { TView } from "../themedComponents/themed-view";
import { TTextInput } from "../themedComponents/themed-textInput";
import { TButton } from "../themedComponents/themed-button";
import { TText } from "../themedComponents/themed-text";
import useOrgDetails from "@/hooks/use-org-details";

export default function EditBusinessAccount({ user }: AccountFormProps) {
  const { name, logoUrl } = useOrgDetails();
  const [businessAccount, setBusinessAccount] = useState<BusinessAccount>({
    logo: "",
    businessName: "",
  });

  const clearForm = () => {
    setBusinessAccount({ ...businessAccount, businessName: "", logo: "" });
  };
  const handleUpdateBusinessAccount = async () => {
    try {
      const org = user.organizationMemberships[0].organization;

      await org.update({
        name: businessAccount.businessName,
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

      <TView className="flex items-center justify-center">
        <TButton onPress={handleUpdateBusinessAccount} type="secondary">
          <TText type="secondary">Update Account</TText>
        </TButton>
      </TView>
    </TView>
  );
}
