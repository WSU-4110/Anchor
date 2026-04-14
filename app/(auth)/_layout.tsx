import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isAuthLoaded || !isUserLoaded) return null;

  if (isSignedIn) {
    const memberships = user?.organizationMemberships || [];
    const isBusinessUser = memberships.length > 0;

    const intendedRole =
      user?.publicMetadata?.role ?? user?.unsafeMetadata?.role;

    if (isBusinessUser) {
      return <Redirect href="/(business)" />;
    }

    if (intendedRole === "business") {
      return <Redirect href="/(auth-business)" />;
    }

    return <Redirect href="/(home)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}