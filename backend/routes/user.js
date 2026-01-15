import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import crypto from "crypto";

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exist" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPass,
        })

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: `${username} created successfully!` })
    } catch (err) {
        res.json({ message: `Something went wrong ${err}` });
    }
});

// login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        } else{
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid username or password"});
        }

    } catch (err) {
        res.status(500).json({ message: `Something went wrong ${err}` })
    }
});

// logout
// router.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ message: "Unable to Log out!" });
//         }
//         return res.status(200).json({ message: "Logged out!" });
//     })
// });

export default router;