import mongoose from 'mongoose';

const mongoDBUri = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV;

export const connectToDB = async () => {
mongoose
    .connect(mongoDBUri!)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(`Error on connect to MongoDB ${err}`);
    });
}
