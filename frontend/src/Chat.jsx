import { useContext, useEffect, useRef } from 'react';
import { MyContext } from './context/MyContext';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const Chat = () => {
  const { newChat, prevChats, streamReply, isGenerating } = useContext(MyContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prevChats, streamReply]);

  const hasMessages = prevChats && prevChats.length > 0;

  return (
    <div className="flex-1 overflow-y-auto w-full relative">

      {newChat && !hasMessages && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-fade-up"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <i className="fa-solid fa-wand-magic-sparkles text-base" style={{ color: "#a5b4fc" }} />
          </div>
          <h2
            className="text-2xl font-semibold tracking-tight mb-2"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            What can I help with?
          </h2>
          <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
            Start a conversation. Ask anything — I'll think it through.
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {prevChats?.map((chat, i) => (
          <div
            key={i}
            className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
          >
            {chat.role === "user" ? (
              <div
                className="max-w-[85%] md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  borderBottomRightRadius: 4,
                }}
              >
                {chat.content}
              </div>
            ) : (
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(99,102,241,0.15)" }}
                  >
                    <i className="fa-solid fa-wand-magic-sparkles text-xs" style={{ color: "#a5b4fc" }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    QueryFlow
                  </span>
                </div>
                <div className="prose-chat">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {chat.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.15)" }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles text-xs" style={{ color: "#a5b4fc" }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  QueryFlow
                </span>
                {!streamReply && (
                  <span className="flex items-center gap-1 ml-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </span>
                )}
              </div>
              {streamReply && (
                <div className="prose-chat">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {streamReply}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Chat;
