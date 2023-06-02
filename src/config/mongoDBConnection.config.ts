import mongoose from "mongoose";

const connectionMongoDB = async () => {
    try {
        const uri = <string>process.env.MONGO_URI
        await mongoose.connect(uri);
        console.log(`MongoDB connected`)
    } catch (error) {
        console.error(error);
    }
}

export default connectionMongoDB;