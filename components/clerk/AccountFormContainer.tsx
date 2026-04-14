import { UserResource } from "@clerk/types";
import { TView } from "../themedComponents/themed-view";
import EditUserAccount from "./editUserAccount";
import EditBusinessAccount from "./editBusinessAccount";
import { useGetBusiness } from "@/convex/queries";
import { Text, View } from "react-native";
import { Loader2 } from "lucide-react-native";

export type AccountFormContainerProps = {
  accountType: string;
  user: UserResource;
};
export default function AccountFormContainer({
  accountType,
  user,
}: AccountFormContainerProps) {
  const { data, isLoading, isError, error } = useGetBusiness(user.id);

  if (isLoading) {
    return (
      <View>
        <Loader2 className="animate-spin" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>
          There was an error getting specific business: {String(error)}
        </Text>
      </View>
    );
  }
  const renderForm = (userType: string) => {
    switch (userType) {
      case "user": {
        return <EditUserAccount user={user} />;
      }
      case "business": {
        return (
          <View>
            {data && (
  <EditBusinessAccount
    user={user}
    data={{
      businessName: data.businessName,
      businessLocation: data.businessLocation,
      businessLogo: data.businessLogo,
      created_by: data.created_by,
      businessId: data.businessId,
      businessFollowers: data.businessFollowers ?? [], 
    }}
  />
)}
          </View>
        );
      }
    }
  };
  return <TView>{renderForm(accountType)}</TView>;
}
