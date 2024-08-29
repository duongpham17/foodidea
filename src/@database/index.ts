import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false; // Track the connection state

const connectDB = async () => {
    try {
        const database = process.env.DATABASE;

        if (!database) {
            throw new Error("Database URL not provided in environment variables");
        }

        if (isConnected) {
            console.log("Using existing database connection");
            return;
        }

        const development = process.env.NODE_ENV === "development";

        mongoose.set('strictQuery', true);

        const options: ConnectOptions = {
            // Add any specific options you need here
        };

        await mongoose.connect(database, options);

        isConnected = true;

        if (development) {
            console.log("DB connection successful!");
        }

    } catch (err) {
        console.error("Could not connect to database", err);
    }
};

export default connectDB;