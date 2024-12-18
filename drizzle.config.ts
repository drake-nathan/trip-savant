import type { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  tablesFilter: ["trip-savant_*"],
} satisfies Config;
