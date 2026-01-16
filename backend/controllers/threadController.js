import { Thread } from "../models/Thread.js";

export const getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find({ author: req.user._id }).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch thread" })
    }
}

export const getThreadById = async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId, author: req.user._id, });
        if (!thread) {
            res.status(404).json({ error: "Thread not found" });
        }
        return res.status(200).json(thread.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch chat" })
    }
}

export const deleteThread = async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId, author: req.user._id, });
        if (!deletedThread) {
            res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ error: "Thread deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete thread" })
    }
}