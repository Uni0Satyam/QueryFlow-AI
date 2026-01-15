import express from "express";
import 'dotenv/config';
import cors from 'cors';
import mongoose from "mongoose";
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';
import session from 'express-session';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));

app.use("/api", chatRoutes);
app.use("/auth", userRoutes);

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_uri)
        console.log("Db connected!");
    } catch (err) {
        console.log(err);
    }
}

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.listen(PORT, () => {
    console.log("App started at PORT: ", PORT);
    connectDb();
})