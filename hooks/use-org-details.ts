import { useUser } from "@clerk/clerk-expo";

export default function useOrgDetails() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return {
      name: "",
      logoUrl: "",
      id: "",
    };
  }

  const orgMembership = user.organizationMemberships?.[0];
  const organization = orgMembership?.organization;

  return {
    name: organization?.name ?? "",
    logoUrl: organization?.imageUrl ?? "",
    id: organization?.id ?? "",
  };
}
