import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbClient } from "@nexus/db";
import { apiKey, bearer, organization, twoFactor } from "better-auth/plugins";
import { ac } from "./permissions";

const auth = betterAuth({
  appName: "Nexus ERP",
  database: drizzleAdapter(dbClient, {
    provider: "pg",
  }),
  plugins: [
    bearer(),
    apiKey(),
    twoFactor(),
    organization({
      teams: {
        enabled: true,
      },
      ac,
      dynamicAccessControl: {
        enabled: true,
      },
    }),
  ],
});

export default auth;
