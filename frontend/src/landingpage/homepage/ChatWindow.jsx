import './ChatWindow.css';
import Chat from '../../Chat.jsx'
import { MyContext } from '../../context/MyContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { AuthContext } from '../../context/AuthContext.jsx';

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat,getAllThreads } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { handleLogout } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const getReply = async () => {
    setLoading(true);
    setNewChat(null);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    }

    try {
      const response = await fetch('http://localhost:8080/v1/chat', options);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const res = await response.json();
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    await getAllThreads();
  }

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => (
        [...prevChats, {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        }]
      ));
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryFlow <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      {
        isOpen &&
        <div className="dropDown">
          <div className="dropDownItem" onClick={(e) => handleLogout()}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
        </div>
      }
      <Chat></Chat>

      <RingLoader color='white' loading={loading}></RingLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything' className='inputBox' value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? getReply() : ""}></input>
          <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
          QueryFlow can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
