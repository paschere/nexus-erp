// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://user:user@localhost:5432/erp_db`,
  },
  schema: "./src/schemas/*.ts",
  out: "./src/drizzle",
});
