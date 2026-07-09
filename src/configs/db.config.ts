import mongoose from "mongoose"

const DB_URI = process.env.MONGO_URI!;

export const connectDb = async () => {
    try {
        const mongooseInstance = await mongoose.connect(DB_URI);
        console.log("Connected to DB !");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}