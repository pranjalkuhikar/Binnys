import mongoose from "mongoose";
import { config } from "../configs/config.js";

const connectDB = () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((e) => {
      console.error(`MongoDB connection error: ${e}`);
      process.exit(1);
    });
};

export default connectDB;
