import express from "express";
import 'dotenv/config';
import cors from 'cors';
import mongoose from "mongoose";
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

const connectDb = async() => {
    try{
        mongoose.connect(process.env.MONGO_uri)
        console.log("Db connected!");
    } catch(err){
        console.log(err);
    }
}

app.listen(PORT, () => {
    console.log("App started at PORT: ", PORT);
    connectDb();
})