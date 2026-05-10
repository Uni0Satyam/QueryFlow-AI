import Chat from '../../Chat.jsx';
import { MyContext } from '../../context/MyContext.jsx';
import { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import servers from '../../environment.js';

const ChatWindow = () => {
  const {
    prompt, setPrompt, reply, setReply,
    streamReply, setStreamReply, isGenerating, setIsGenerating,
    currThreadId, setPrevChats, setNewChat,
    getAllThreads, toggleSidebar, isSidebarOpen,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const textareaRef = useRef(null);

  const { handleLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  const getReply = async () => {
    if (!prompt?.trim() || loading) return;

    const message = prompt;
    setLoading(true);
    setNewChat(false);
    setIsGenerating(true);
    setStreamReply("");
    setReply(null);
    setPrevChats(prev => [...prev, { role: "user", content: message }]);
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, threadId: currThreadId }),
    };

    try {
      const response = await fetch(`${servers.prod}/v1/chat`, options);

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        console.error('Chat request failed:', response.statusText);
        return;
      }

      let finalText = "";
      if (!response.body) {
        finalText = await response.text();
        setStreamReply(finalText);
      } else {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          finalText += decoder.decode(value, { stream: true });
          setStreamReply(finalText);
        }
      }

      setReply(finalText);
      setPrevChats(prev => [...prev, { role: "assistant", content: finalText }]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
      setLoading(false);
      await getAllThreads();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      getReply();
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-full"
      style={{ background: "var(--bg)" }}
    >
      <header
        className="relative z-10 flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={toggleSidebar}
          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--surface-2)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          {isSidebarOpen
            ? <i className="fa-solid fa-xmark" />
            : <i className="fa-solid fa-bars" />
          }
        </button>

        <span
          className="text-sm font-semibold tracking-tight absolute left-1/2 -translate-x-1/2"
          style={{ color: "var(--text-primary)" }}
        >
          QueryFlow
        </span>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(o => !o)}
            className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <i className="fa-solid fa-user text-xs" />
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 top-11 w-44 rounded-xl overflow-hidden animate-fade-in"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full px-4 py-3 text-sm flex items-center gap-3 transition-colors text-left"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--surface-2)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <Chat />

      {loading && (
        <div
          className="h-px w-full shrink-0 relative overflow-hidden"
          style={{ background: "var(--surface-2)" }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: "40%",
              background: "var(--accent)",
              animation: "shimmerBar 1.4s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes shimmerBar {
              0%   { left: -40%; }
              100% { left: 100%; }
            }
          `}</style>
        </div>
      )}

      <div className="px-4 pb-5 pt-3 shrink-0">
        <div
          className="max-w-2xl mx-auto rounded-2xl flex items-end gap-3 px-4 py-3 transition-all"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
          onFocusCapture={e => e.currentTarget.style.borderColor = "var(--accent)"}
          onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask anything…"
            className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed"
            style={{
              color: "var(--text-primary)",
              caretColor: "var(--accent)",
              maxHeight: 160,
            }}
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={onKeyDown}
          />
          <button
            onClick={getReply}
            disabled={loading || !prompt?.trim()}
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all text-sm ${prompt?.trim() && !loading ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            style={{
              background: prompt?.trim() && !loading ? "var(--accent)" : "var(--surface-2)",
              color: prompt?.trim() && !loading ? "#fff" : "var(--text-tertiary)",
            }}
          >
            {loading
              ? <i className="fa-solid fa-stop text-xs" />
              : <i className="fa-solid fa-arrow-up text-xs" />
            }
          </button>
        </div>
        <p className="text-center text-xs mt-2.5" style={{ color: "var(--text-tertiary)" }}>
          QueryFlow can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
