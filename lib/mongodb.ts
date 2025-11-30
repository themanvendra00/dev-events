import mongoose, { Connection } from 'mongoose';

/**
 * Global connection cache to prevent multiple connections during development.
 * In Next.js, the module can be cached, but during hot reloads, new instances
 * can be created, leading to multiple connections. This cache ensures we reuse
 * the existing connection.
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend the global NodeJS namespace to include our cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the cache if it doesn't exist (or reuse existing cache)
const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cache in global scope to persist across hot reloads in development
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Uses connection caching to prevent multiple connections during development.
 *
 * @returns {Promise<Connection>} A promise that resolves to the MongoDB connection
 * @throws {Error} If the MongoDB URI is not defined or connection fails
 */
async function connectDB(): Promise<Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing promise if connection is in progress
  if (cached.promise) {
    return cached.promise;
  }

  // Get MongoDB URI from environment variables
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(MONGODB_URI)
    .then((mongooseInstance) => {
      // Store the connection in cache
      cached.conn = mongooseInstance.connection;
      return cached.conn;
    })
    .catch((error) => {
      // Clear the promise on error to allow retry
      cached.promise = null;
      throw error;
    });

  return cached.promise;
}

export default connectDB;
