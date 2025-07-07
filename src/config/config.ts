import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "",
  env: process.env.NODE_ENV || "development",
};
