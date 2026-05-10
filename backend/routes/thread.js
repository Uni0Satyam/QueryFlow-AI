import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getAllThreads, getThreadById, deleteThread } from '../controllers/threadController.js';

const router = express.Router();

router.get("/thread", authMiddleware, getAllThreads);

router.get("/thread/:threadId", authMiddleware, getThreadById);

router.delete("/thread/:threadId", authMiddleware, deleteThread);

export default router;