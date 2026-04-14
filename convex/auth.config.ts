import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://optimum-dove-67.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
