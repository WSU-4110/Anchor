import { UserResource } from "@clerk/types";
import { TView } from "../themedComponents/themed-view";
import EditUserAccount from "./editUserAccount";
import EditBusinessAccount from "./editBusinessAccount";

export type AccountFormContainerProps = {
  accountType: string;
  user: UserResource;
};
export default function AccountFormContainer({
  accountType,
  user,
}: AccountFormContainerProps) {
  const renderForm = (userType: string) => {
    switch (userType) {
      case "user": {
        return <EditUserAccount user={user} />;
      }
      case "business": {
        return <EditBusinessAccount user={user} />;
      }
    }
  };
  return <TView>{renderForm(accountType)}</TView>;
}
