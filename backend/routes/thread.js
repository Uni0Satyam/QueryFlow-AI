import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getAllThreads, getThreadById, deleteThread } from '../controllers/threadController.js';

const router = express.Router();

//test
// router.post("/test", async (req, res) => {
//     try {
//         const thread = new Thread({
//             threadId: "123",
//             title: "Testing new thread"
//         });

//         const response = await thread.save();
//         res.send(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to save thread" })
//     }
// });

router.get("/thread", authMiddleware, getAllThreads);

router.get("/thread/:threadId", authMiddleware, getThreadById);

router.delete("/thread/:threadId", authMiddleware, deleteThread);

export default router;