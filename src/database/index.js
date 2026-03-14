import mongoose from 'mongoose';

let isConnected = false;

export default async function connectToDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('Database connected successfully');
  } catch (e) {
    console.error('Database connection error:', e.message);
    throw e;
  }
}
