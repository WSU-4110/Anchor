import { useState } from "react";
import { router } from "expo-router";
import { ArrowBigLeft } from "lucide-react-native";
import { useAuth, useClerk } from "@clerk/clerk-expo";

import { Business } from "@/constants/types";
import { useCreateBusiness } from "@/convex/mutations";
import { TButton } from "@/components/themedComponents/themed-button";
import { TText } from "@/components/themedComponents/themed-text";
import { TTextInput } from "@/components/themedComponents/themed-textInput";
import { TView } from "@/components/themedComponents/themed-view";

type SetUpProps = {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
  userId: string;
};

function normalizeCoords(value: string) {
  const cleaned = value.trim().replace(/\s+/g, "");
  const parts = cleaned.split(",");

  if (parts.length !== 2) {
    return null;
  }

  const lat = Number.parseFloat(parts[0]);
  const lng = Number.parseFloat(parts[1]);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return null;
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return null;
  }

  return `${lat.toFixed(2)},${lng.toFixed(2)}`;
}

export default function SetUp({ business, setBusiness, userId }: SetUpProps) {
  const clerk = useClerk();
  const { isLoaded: isAuthLoaded } = useAuth();
  const createBusiness = useCreateBusiness();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateBusiness = async () => {
    if (isSubmitting) return;

    const trimmedName = business.businessName.trim();
    const normalizedLocation = normalizeCoords(business.businessLocation);

    if (!trimmedName) {
      setError("Business name is required.");
      return;
    }

    if (!normalizedLocation) {
      setError(
        "Business location must be latitude,longitude with a comma. Example: 42.33,-83.05"
      );
      return;
    }

    if (!isAuthLoaded) {
      setError("Authentication is still loading. Please try again.");
      return;
    }

    if (!clerk?.createOrganization || !clerk?.setActive) {
      setError("Organization tools are not ready yet. Please try again.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const newOrganization = await clerk.createOrganization({
        name: trimmedName,
      });

      if (!newOrganization?.id) {
        throw new Error("Organization was created without an id.");
      }

      await clerk.setActive({
        organization: newOrganization.id,
      });

      await createBusiness.mutateAsync({
        businessName: trimmedName,
        businessLocation: normalizedLocation,
        businessId: newOrganization.id,
        created_by: userId,
        businessFollowers: business.businessFollowers ?? [],
      });

      router.replace("/(business)");
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "There was an error creating the business.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TView className="flex-1 items-center justify-center p-6">
      <TView className="flex flex-row gap-24 mb-8 mt-4">
        <ArrowBigLeft color="white" onPress={() => router.back()} />
      </TView>

      <TText>Finish setting up your business</TText>

      <TTextInput
        type="default"
        placeholder="Business Name"
        value={business.businessName}
        style={{ color: "white" }}
        placeholderTextColor="#666666"
        onChangeText={(businessName) => {
          setBusiness((prev) => ({ ...prev, businessName }));
        }}
        className="w-full my-4 border p-4"
      />

      <TTextInput
        type="default"
        placeholder="42.33,-83.05"
        value={business.businessLocation}
        style={{ color: "white" }}
        placeholderTextColor="#666666"
        onChangeText={(businessLocation) => {
          setBusiness((prev) => ({ ...prev, businessLocation }));
        }}
        className="w-full my-4 border p-2"
      />

      <TText
        style={{
          color: "#9ca3af",
          fontSize: 12,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Use latitude,longitude with a comma. Two decimals is enough.
      </TText>

      {error && (
        <TText
          style={{
            color: "red",
            fontSize: 12,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {error}
        </TText>
      )}

      <TButton type="primary" onPress={handleCreateBusiness}>
        <TText type="secondary">
          {isSubmitting ? "Creating..." : "Add Business"}
        </TText>
      </TButton>
    </TView>
  );
}