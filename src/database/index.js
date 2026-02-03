import mongoose from 'mongoose';

export default async function connectToDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully');
  } catch (e) {
    console.error('Database connection error:', e.message);
    throw e;
  }
}
