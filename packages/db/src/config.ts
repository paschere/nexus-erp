import t from "typebox";
import { Compile } from "typebox/compile";

// create env schema and validator
const envSchema = t.Object({
  POSTGRES_USER: t.String(),
  POSTGRES_PASSWORD: t.String(),
  POSTGRES_DB: t.String(),
  POSTGRES_PORT: t.String(),
  POSTGRES_HOST: t.String(),
});

const envValidator = Compile(envSchema);
const env = envValidator.Parse(process.env);

const config = {
  databaseUrl: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
};

export default config;
