import './ChatWindow.css';
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx';
import { useContext } from 'react';

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply , currThreadId, setCurrThreadId} = useContext(MyContext);

  const getReply = async () => {
    console.log(prompt, currThreadId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      }),
    }

    try {
      const response = await fetch('http://localhost:8080/api/chat', options);
      const res = await response.json();
      setReply(res.reply);
      console.log(res.reply);
    } catch (error) {
      
    }
  }

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryFlow <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      <Chat></Chat>

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything' className='inputBox' value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? getReply() : ""}></input>
          <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
          QueryFlow can make mistakes. Check important info. See Cookies Preferences.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
