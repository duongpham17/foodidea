// src/global.d.ts (or at your project root)
import type { Mongoose } from "mongoose";

declare global {
  // Extend NodeJS global type
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}