import { useState } from "react";
import * as Crypto from "expo-crypto";
import { useAuth, useUser } from "@clerk/clerk-expo";

import SetUp from "./set-up";
import Loader from "@/components/loader";
import { TText } from "@/components/themedComponents/themed-text";
import { TView } from "@/components/themedComponents/themed-view";
import { Business } from "@/constants/types";

export default function Page() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();

  const [business, setBusiness] = useState<Business>(() => ({
    businessName: "",
    businessId: Crypto.randomUUID(),
    businessLocation: "",
    created_by: "",
    businessFollowers: [],
  }));

  if (!isAuthLoaded || !isUserLoaded) {
    return <Loader isLoading={true} />;
  }

  if (!isSignedIn || !user) {
    return (
      <TView className="flex-1 items-center justify-center p-8">
        <TText>You need to be signed in to finish business setup.</TText>
      </TView>
    );
  }

  return (
    <TView className="flex-1">
      <SetUp business={business} setBusiness={setBusiness} userId={user.id} />
    </TView>
  );
}