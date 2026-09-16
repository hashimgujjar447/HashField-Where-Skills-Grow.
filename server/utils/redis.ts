import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const getRedisConfig = () => {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL is not defined in environment variables");
  }
  return url;
};

export const redis = new Redis(getRedisConfig(), {
  tls: {
    rejectUnauthorized: false,
  },
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
  retryStrategy(times) {
    if (times > 5) {
      return null;
    }
    return Math.min(times * 300, 3000);
  },
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("ready", () => console.log("✅ Redis ready"));
redis.on("error", (err) => console.error("❌ Redis error:", err.message));
