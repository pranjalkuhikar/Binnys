import dotenv from "dotenv";

dotenv.config();

const _config = {
  PORT: String(process.env.PORT),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRE: String(process.env.JWT_EXPIRE),
  REFRESH_SECRET: String(process.env.REFRESH_SECRET),
  REFRESH_EXPIRE: String(process.env.REFRESH_EXPIRE),
  WINDOW_MS: String(process.env.WINDOW_MS),
  MAX: String(process.env.MAX),
};

export const config = Object.freeze(_config);
