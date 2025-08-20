import mongoose, { Mongoose } from "mongoose";

const _MONGODB_URI = process.env.MONGODB_URI;

if (!_MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environment variable in .env.local");
}

// TypeScript now knows this is a string
const MONGODB_URI: string = _MONGODB_URI;

declare global {
  var mongooseCache:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } =
  global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((conn) => {
      console.log("MongoDB connected successfully");
      return conn;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
