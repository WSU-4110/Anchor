import { useState } from "react";
import SetUp from "./set-up";
import { TView } from "@/components/themedComponents/themed-view";
import { Business } from "@/constants/types";
import { useUser } from "@clerk/clerk-expo";
import * as Crypto from "expo-crypto";
import { Loader2 } from "lucide-react-native";

export default function Page() {
  const { user } = useUser();
  const [business, setBusiness] = useState<Business>(() => ({
    businessName: "",
    businessId: Crypto.randomUUID(), // This only runs ONCE on initial mount
    businessLocation: "",
    created_by: "",
  }));
  return (
    <TView className="flex-1">
      {user ? (
        <TView>
          <SetUp
            business={business}
            setBusiness={setBusiness}
            userId={user.id}
          />
        </TView>
      ) : (
        <TView>
          <Loader2 className="animate-spin" />
        </TView>
      )}
    </TView>
  );
}
