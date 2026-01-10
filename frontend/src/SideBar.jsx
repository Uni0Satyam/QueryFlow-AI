import "./SideBar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from 'uuid';

const SideBar = () => {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map(thread => ({ 
        threadId: thread.threadId, 
        title: thread.title }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

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
      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
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
      const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, { method: "DELETE" });
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

    <section className='sidebar'>
      <button onClick={createNewChat}>
        <img src="/logo.png" alt="QueryFlow" className="logo" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {
          allThreads?.map((thread, indx) => (
            <li key={indx} onClick={(e) => changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted": ""}>{thread.title}
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