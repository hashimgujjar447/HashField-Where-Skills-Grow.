import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const dbUrl: string = process.env.MONGO_URI || "";

export const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    // setTimeout(connectDb, 500);
  }
};
