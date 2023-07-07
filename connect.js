
import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export const connectDB = (url) => {
    console.log('connecting to DB..');
    return mongoose.connect(url);
}