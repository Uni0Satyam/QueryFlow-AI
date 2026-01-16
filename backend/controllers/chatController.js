import { Thread } from '../models/Thread.js'
import getResponse from '../utils/ai.js'

export const chat = async (req, res) => {
    const userId = req.user._id;
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "Missing required field" })
    }

    try {
        let thread = await Thread.findOne({ threadId, author: userId });

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [],
                author: userId,
            });
        }

        thread.messages.push({ role: "user", content: message, author: userId });

        const assistantReply = await getResponse(message);

        thread.messages.push({ role: "assistant", content: assistantReply, author: userId, })
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: assistantReply });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}