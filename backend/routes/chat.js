import express from 'express';
import Thread from '../models/Thread.js'
import getResponse from '../utils/ai.js'

const router = express.Router();

//test
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "123",
            title: "Testing new thread"
        });

        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save thread" })
    }
});

// get all threads
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch thread" })
    }
});

// get particular thread
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            res.status(404).json({ error: "Thread not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch chat" })
    }
})

// delete particular thread
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ error: "Thread deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete thread" })
    }
})

// 
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "Missing required field" })
    }

    try {
        const thread = await Thread.findOne({ threadId });

        if (!threadId) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply })
        thread.updatedAt = new Date();
        
        await thread.save();
        res.json({reply: assistantReply});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;