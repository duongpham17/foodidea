import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const database = process.env.DATABASE as string;
        
        const development = process.env.NODE_ENV === "development";

        mongoose.set('strictQuery', true);

        await mongoose.connect( database );

        if (development) console.log("DB connection successful!");

    } catch (err){
        console.log("Could not connect to database");
    }
}

export default connectDB