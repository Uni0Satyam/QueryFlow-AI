import "./SideBar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { v4 as uuidv4 } from 'uuid';

const SideBar = () => {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats ,getAllThreads, isSidebarOpen, toggleSidebar } = useContext(MyContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  }

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(`https://queryflow-ai-backend.onrender.com/api/thread/${newThreadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err)
    }
  }

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`https://queryflow-ai-backend.onrender.com/api/thread/${threadId}`, { method: "DELETE", Authorization: `Bearer ${token}` });
      const result = await response.json();
      alert(result.error);

      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if (threadId === currThreadId) {
        createNewChat();
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button>
        <img src="/logo.png" alt="QueryFlow" className="logo" />
        <i className="fa-solid fa-xmark" onClick={toggleSidebar}></i>
      </button>
      <button onClick={createNewChat}>
        <p style={{margin: "0", fontWeight: "bold"}}>New Chat</p>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {
          allThreads?.map((thread, indx) => (
            <li key={indx} onClick={(e) => changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted" : ""}>{thread.title}
              <i className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}>
              </i>
            </li>
          ))
        }
      </ul>

      <div className="sign">
        <p>Made with <span style={{ color: "red" }}>&hearts;</span> by Satyam</p>
      </div>
    </section>
  )
}

export default SideBar;
