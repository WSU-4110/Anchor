import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import SetUp from "./set-up";
import { TView } from "@/components/themedComponents/themed-view";
import { TText } from "@/components/themedComponents/themed-text";

// This component is "Lazy" - it only exists once Page is healthy
function BusinessSetUpContent() {
  const { isLoaded, isSignedIn } = useAuth();
  const [businessName, setBusinessName] = useState("");

  // Guard inside the child
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <TView className="flex-1 justify-center items-center">
        <TText>Session expired. Please sign in again.</TText>
      </TView>
    );
  }

  return (
    <SetUp
      businessName={businessName}
      setBusinessName={setBusinessName}
    />
  );
}

export default function Page() {
  const { isLoaded, isSignedIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the native mount AND Clerk's initial load
    if (isLoaded) {
      setReady(true);
    }
  }, [isLoaded]);

  if (!isLoaded || !ready) return null;

  return (
    <TView className="flex-1">
      {isSignedIn ? <BusinessSetUpContent /> : <TText>Please sign in</TText>}
    </TView>
  );
}
