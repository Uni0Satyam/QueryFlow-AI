import { createContext } from "react";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllThread } from '../utils/getAllThread.js'

export const MyContext = createContext("");

export const MyProvider = ({ children }) => {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currThreadId, setCurrThreadId] = useState(uuidv4());
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);

    const getAllThreads = async () => {
        await getAllThread(setAllThreads);
    };

    const providerValues = {
        prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        newChat, setNewChat,
        prevChats, setPrevChats,
        allThreads, setAllThreads,
        getAllThreads
    };

    return (
        <MyContext.Provider value={providerValues}>
            {children}
        </MyContext.Provider>
    );
}