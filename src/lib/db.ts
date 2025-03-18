import { ifError } from "assert";
import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI!; 

if (!MONGODB_URI) {
    throw new Error("Define mongoDB URI in env file"); 
}

let cached = global.mongoose; 
// as nextjs runs on edge its possible that db connection is already established. 
// so we're checking that by cached variable if the chached var doesn't exist then 
// connection already exist then cached will contain connection string. 
// otherwise if connection doesn't exist then the connection is set to null

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }; 
}

// db connecition
export async function connectToDB() {
    // if cached.conn != null then return cached.conn
    if (cached.conn) {
        return cached.conn; 
    }

    // if connection is already in proocess(Promise)
    if (!cached.promise) {
        const opts = {
            bufferCommands: true, 
            maxPoolSize: 10
        }

        cached.promise = mongoose
                        .connect(MONGODB_URI, opts)
                        .then(() => mongoose.connection) // ensures the return type will be mongoose.connection type
    }

    try {
        cached.conn = await cached.promise; 
    } catch (error) {
        cached.promise = null; 
        throw new Error("Check DB file")
    }

    return cached.conn; 
}