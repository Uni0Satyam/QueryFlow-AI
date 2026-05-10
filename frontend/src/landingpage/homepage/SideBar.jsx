import { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { v4 as uuidv4 } from 'uuid';
import servers from "../../environment";

const SideBar = () => {
  const {
    allThreads, setAllThreads,
    currThreadId, setNewChat, setPrompt, setReply,
    setCurrThreadId, setPrevChats, getAllThreads,
    isSidebarOpen, toggleSidebar,
  } = useContext(MyContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(`${servers.prod}/api/thread/${newThreadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${servers.prod}/api/thread/${threadId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const result = await response.json();
      alert(result.error);
      setAllThreads(prev => prev.filter(t => t.threadId !== threadId));
      if (threadId === currThreadId) createNewChat();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden cursor-pointer"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: 260,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="QueryFlow" className="h-5 w-5 rounded-full object-cover" />
            <span className="text-sm font-semibold tracking-tight">QueryFlow</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-md transition-colors text-xs"
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
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="px-3 pt-3 pb-2">
          <button
            onClick={createNewChat}
            className="cursor-pointer w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--accent-dim, rgba(99,102,241,0.1))",
              color: "#a5b4fc",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
          >
            <span>New chat</span>
            <i className="fa-solid fa-pen-to-square text-xs" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {allThreads?.length > 0 && (
            <p
              className="text-xs px-2 mb-2 uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)", letterSpacing: "0.1em" }}
            >
              Recent
            </p>
          )}
          <ul className="space-y-0.5">
            {allThreads?.map((thread, i) => (
              <li
                key={i}
                onClick={() => changeThread(thread.threadId)}
                className="group relative flex items-center rounded-lg px-3 py-2 text-sm cursor-pointer transition-all"
                style={{
                  background: thread.threadId === currThreadId
                    ? "var(--surface-2)"
                    : "transparent",
                  color: thread.threadId === currThreadId
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  border: "1px solid transparent",
                  borderColor: thread.threadId === currThreadId ? "var(--border)" : "transparent",
                }}
                onMouseEnter={e => {
                  if (thread.threadId !== currThreadId) {
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={e => {
                  if (thread.threadId !== currThreadId) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <span className="truncate flex-1 pr-4">{thread.title}</span>
                <button
                  onClick={e => { e.stopPropagation(); deleteThread(thread.threadId); }}
                  className="cursor-pointer absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded text-xs"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="px-4 py-3 text-xs text-center"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-tertiary)" }}
        >
          Made with <span style={{ color: "#f87171" }}>♥</span> by Satyam
        </div>
      </aside>
    </>
  );
};

export default SideBar;
