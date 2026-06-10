import mongoose from 'mongoose';
import { env } from './env';

/**
 * Connects to MongoDB. Throws if MONGODB_URI is missing so the seed script
 * fails loudly, but the API server treats a connection failure as non-fatal
 * (see index.ts) so non-DB routes / health checks still work in dev.
 */
export async function connectDB(): Promise<void> {
  if (!env.mongoUri) {
    throw new Error(
      'MONGODB_URI is not set. Add your MongoDB Atlas connection string to backend/.env'
    );
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  console.log('✓ MongoDB connected');
}
