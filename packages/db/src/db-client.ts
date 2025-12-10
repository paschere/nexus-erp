import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { schemas } from "@nexus/db/schemas";
import { relations } from "@nexus/db/relations";

const db = drizzle(
  process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/postgres",
  {
    schema: schemas,
    relations,
  }
);

export default db;
