import mongoose from 'mongoose';

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Database connection failed');
    }
};
