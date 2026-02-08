import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isAuthLoaded || !isUserLoaded) return null;

  if (isSignedIn) {
    const memberships = user?.organizationMemberships || [];
    const isBusinessUser = memberships.length > 0;
    const intendedRole = user?.unsafeMetadata?.initialRole;

    // 1. If they are in a business org, send to business dashboard
    if (isBusinessUser) {
      return <Redirect href="/(business)" />;
    }

    // 2. If they aren't in an org BUT signed up as a business, send to setup
    if (intendedRole === "business") {
      return <Redirect href="/(auth-business)" />;
    }

    // 3. Otherwise, they are a standard personal user
    return <Redirect href="/(home)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
