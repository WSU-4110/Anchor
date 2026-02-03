import { useUser } from "@clerk/clerk-expo";

export type OrgDetails = {
  name: string;
  logoUrl: string;
};
export default function useOrgDetails(): OrgDetails {
  const { user, isLoaded } = useUser();
  //1. One user can only be associated with one organization for now.
  if (!isLoaded) {
    console.warn("user not loaded from clerk");
  }
  const organization = user?.organizationMemberships[0].organization;
  const name = organization?.name || "";
  const logoUrl = organization?.imageUrl || "";

  return {
    name,
    logoUrl,
  };
}
