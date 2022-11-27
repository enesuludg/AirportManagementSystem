import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, PG_HOST, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } =
  process.env;
