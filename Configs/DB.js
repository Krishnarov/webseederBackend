import mongoose from "mongoose";
const connectDB = async () => {
  if (!process.env.DB_URI) {
    console.error("Error: MONGO_URI is not define in .env file.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch {
    console.error(`Database Connection : ${error.message}`);
  }
};

export default connectDB;
