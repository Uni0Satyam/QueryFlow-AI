import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { chat } from '../controllers/chatController.js';

const router = express.Router();

router.post("/chat", authMiddleware, chat);

export default router;