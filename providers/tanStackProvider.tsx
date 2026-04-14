import { ReactNode, useMemo } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

type TanStackQueryProviderProps = {
  children: ReactNode;
};

export default function TanStackQueryProvider({
  children,
}: TanStackQueryProviderProps) {
  const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error(
      "EXPO_PUBLIC_CONVEX_URL is missing. Make sure .env.local exists and restart Expo."
    );
  }

  const convex = useMemo(() => new ConvexReactClient(convexUrl), [convexUrl]);
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProviderWithClerk>
  );
}
