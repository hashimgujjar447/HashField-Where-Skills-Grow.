import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectDb } from "./utils/db.js";
import { v2 as cloudinary } from "cloudinary";

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const PORT = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: requireEnv("CLOUD_NAME"),
  api_key: requireEnv("CLOUD_API_KEY"),
  api_secret: requireEnv("CLOUD_SECRET_KEY"),
});

app.listen(PORT, () => {
  console.log(`Server is connected with port ${PORT}`);
  connectDb();
});
