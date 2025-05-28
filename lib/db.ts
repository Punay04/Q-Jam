import mongoose from "mongoose";

const connectToDatabase = async () => {
  const url = process.env.MONGODB_URI;
  if (url == null || url == undefined) {
    return console.error("MONGODB_URI is not defined in environment variables");
  } else {
    try {
      await mongoose.connect(url);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
};

export default connectToDatabase;
