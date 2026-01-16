import express from 'express';
import { login, register } from '../controllers/userController.js';

const router = express.Router();

// signup
router.post("/signup", register);

// login
router.post("/login", login);

export default router;