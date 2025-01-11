import "@/lib/env";
import { type Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  schemaFilter: ["public"], // don't want to edit the other schema - they're auto managed by supabase
  tablesFilter: ["*"], // edit this for table prefix as well
} satisfies Config;
