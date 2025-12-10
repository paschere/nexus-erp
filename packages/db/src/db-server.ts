import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";
import { schemas } from "@nexus/db/schemas";
import { relations } from "./relations";

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({
  client,
  schema: schemas,
  relations,
});

export default db;
