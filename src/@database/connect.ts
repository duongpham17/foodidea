import mongoose, { ConnectOptions } from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  const database = process.env.DATABASE;
  if (!database) throw new Error("Database URL not provided in environment variables");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(database, {} as ConnectOptions).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;

  if (process.env.NODE_ENV === "development") {
    console.log("DB connection successful!");
  }

  return cached.conn;
}

global.mongoose = cached;

export default connectDB;
