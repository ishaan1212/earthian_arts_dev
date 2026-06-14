import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "earthian_arts";

  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName });
  console.log(`MongoDB connected to ${mongoose.connection.name}`);
}
