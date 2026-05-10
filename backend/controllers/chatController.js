import { Thread } from '../models/Thread.js'
import streamResponse from '../utils/ai.js'

export const chat = async (req, res) => {
    const userId = req.user._id;
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required field" });
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

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

        const historyMessages = thread.messages.map((msg) => {
            const chatMsg = {
                role: msg.role,
                content: msg.content,
            };
            if (msg.role === 'assistant' && msg.reasoningDetails) {
                chatMsg.reasoning_details = msg.reasoningDetails;
            }
            return chatMsg;
        });

        const userMessage = { role: 'user', content: message };
        const allMessages = [...historyMessages, userMessage];

        thread.messages.push({ role: "user", content: message, author: userId });

        let assistantReply = "";
        let reasoningDetails = undefined;
        const onChunk = (chunk) => {
            assistantReply += chunk;
            res.write(chunk);
        };

        const result = await streamResponse(allMessages, onChunk);
        assistantReply = result.response;
        reasoningDetails = result.reasoningDetails;

        const assistantEntry = { role: "assistant", content: assistantReply, author: userId };
        if (reasoningDetails) {
            assistantEntry.reasoningDetails = reasoningDetails;
        }

        thread.messages.push(assistantEntry);
        thread.updatedAt = new Date();
        await thread.save();
        res.end();
    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.end();
        }
    }
}