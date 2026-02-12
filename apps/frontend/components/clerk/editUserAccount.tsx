import { TView } from "../themedComponents/themed-view";
import { TTextInput } from "../themedComponents/themed-textInput";
import { AccountFormProps, UserAccount } from "@/constants/types";
import { useState } from "react";
import { TButton } from "../themedComponents/themed-button";
import { TText } from "../themedComponents/themed-text";

export default function EditUserAccount({ user }: AccountFormProps) {
  const [userData, setUserData] = useState<UserAccount>({
    firstName: "",
    lastName: "",
    userName: "",
  });

  const clearForm = () => {
    setUserData({ ...userData, firstName: "", lastName: "", userName: "" });
  };

  const handleUpdateProfile = async () => {
    try {
      await user.update({
        username: userData.userName,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      clearForm();
    } catch (err) {
      console.error(`There was an error updating the user profile: ${err}`);
    }
  };

  return (
    <TView className=" w-full gap-2">
      <TText
        style={{
          fontSize: 12,
        }}
      >
        First Name
      </TText>
      <TTextInput
        className="w-auto"
        type={"default"}
        autoCapitalize="none"
        value={userData.firstName}
        placeholder={user.firstName || "Enter First Name"}
        placeholderTextColor="#666666"
        onChangeText={(e) => {
          setUserData({ ...userData, firstName: e });
        }}
      />
      <TText
        style={{
          fontSize: 12,
        }}
      >
        Last Name
      </TText>
      <TTextInput
        className="w-auto"
        type={"default"}
        value={userData.lastName}
        placeholder={user.lastName || "Enter Last Name"}
        placeholderTextColor="#666666"
        onChangeText={(e) => {
          setUserData({ ...userData, lastName: e });
        }}
      />
      <TText
        style={{
          fontSize: 12,
        }}
      >
        User Name
      </TText>
      <TTextInput
        className="w-auto"
        type={"default"}
        autoCapitalize="none"
        value={userData.userName}
        placeholder={user.username || "Enter User Name"}
        placeholderTextColor="#666666"
        onChangeText={(e) => {
          setUserData({ ...userData, userName: e });
        }}
      />
      <TView className="flex items-center justify-center">
        <TButton onPress={handleUpdateProfile} type="secondary">
          <TText type="secondary">Update Account</TText>
        </TButton>
      </TView>
    </TView>
  );
}
