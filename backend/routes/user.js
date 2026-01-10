import express from 'express';
import User from '../models/User.js'
import passport from 'passport';

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    try {
        const newUser = new User({ email, username });
        await User.register(newUser, password);
        res.status(201).json(`{ ${username} registered succesfully }`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
});

// login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(401).json({
                error: info?.message || "Invalid username or password"
            });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            return res.status(200).json({message: "Welcome back to QueryFlow!"});
        });
    })(req, res, next);
});



export default router;