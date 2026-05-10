import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    {
      icon: "↗",
      title: "Real-time Streaming",
      desc: "Watch responses appear word-by-word as the AI generates them — no waiting, no reloading.",
    },
    {
      icon: "◎",
      title: "Conversation Context",
      desc: "Threads preserve full context and reasoning across every message in a session.",
    },
    {
      icon: "□",
      title: "Secure & Private",
      desc: "JWT authentication, encrypted sessions, and zero third-party data sharing.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Optimized streaming pipeline delivers tokens the instant they're generated.",
    },
    {
      icon: "◈",
      title: "Smart Reasoning",
      desc: "Advanced thought-process preservation keeps the AI coherent across long sessions.",
    },
    {
      icon: "⊞",
      title: "Fully Responsive",
      desc: "Pixel-perfect on every screen — desktop, tablet, and mobile.",
    },
  ];

  const stack = ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "OpenRouter API", "JWT Auth", "Streaming"];

  return (
    <div className="min-h-screen bg-bg text-white overflow-x-hidden">

      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-10 py-3 md:py-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="QueryFlow" className="h-7 w-7 rounded-full object-cover" />
          <span className="font-semibold text-[0.9rem] md:text-sm tracking-tight text-white">QueryFlow AI</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Uni0Satyam/QueryFlow-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer btn-ghost text-xs md:text-sm px-2.5 py-1 md:px-4 md:py-2 flex items-center gap-1.5 md:gap-2"
          >
            <i className="fa-brands fa-github text-sm"></i>
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link to="/auth" className="hidden sm:block">
            <button className="cursor-pointer btn-primary text-xs md:text-sm px-3 py-1 md:px-4 md:py-2">Sign in</button>
          </Link>
        </div>
      </nav>

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-6 flex flex-col items-center text-center overflow-hidden">
        <div
          className="orb"
          style={{
            width: 320,
            height: 320,
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="tag mb-6 animate-fade-up text-[0.65rem] md:text-xs">
            AI-powered · Real-time streaming · Open source
          </div>

          <h1
            className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-[4.5rem] font-bold leading-[1.15] tracking-tight mb-4 md:mb-6"
            style={{ letterSpacing: "-0.025em" }}
          >
            Conversations that{" "}
            <span style={{ color: "#a5b4fc" }}>think ahead</span>
          </h1>

          <p className="animate-fade-up delay-200 text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 md:mb-10 px-2">
            QueryFlow AI brings real-time streaming, persistent context, and
            advanced reasoning to a beautifully minimal chat interface.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link to="/home" className="w-full sm:w-auto">
              <button className="cursor-pointer btn-primary px-6 py-3 text-sm w-full">
                Launch App
                <span style={{ opacity: 0.7 }}>→</span>
              </button>
            </Link>
            <a
              href="https://github.com/Uni0Satyam/QueryFlow-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="cursor-pointer btn-ghost px-6 py-3 text-sm w-full">
                View on GitHub
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-widest text-muted mb-2 md:mb-3" style={{ letterSpacing: "0.12em" }}>
            Capabilities
          </p>
          <h2
            className="text-2xl md:text-4xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Built for modern AI
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bento-card p-5 md:p-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-sm md:text-base font-semibold mb-3 md:mb-4"
                style={{ background: "var(--accent-dim)", color: "#a5b4fc" }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5 md:mb-2 text-white">{f.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20 max-w-4xl mx-auto text-center">
        <p className="text-[0.65rem] md:text-xs uppercase tracking-widest text-muted mb-2 md:mb-3" style={{ letterSpacing: "0.12em" }}>
          Stack
        </p>
        <h2
          className="text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-10"
          style={{ letterSpacing: "-0.02em" }}
        >
          Built with modern tech
        </h2>
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="tag hover:border-white/20 transition-all cursor-default text-[0.7rem] md:text-[0.8125rem] px-2.5 py-1 md:px-3.5 md:py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20 max-w-lg mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-widest text-muted mb-2 md:mb-3" style={{ letterSpacing: "0.12em" }}>
            Try it now
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Demo access
          </h2>
          <p className="text-muted text-xs md:text-sm mt-2 md:mt-3">
            Explore all features without signing up.
          </p>
        </div>

        <div
          className="rounded-xl border p-5 md:p-6 font-mono text-xs md:text-sm space-y-3"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span style={{ color: "var(--text-secondary)" }}>username</span>
            <code
              className="px-2 md:px-3 py-1 rounded-md text-[0.65rem] md:text-xs"
              style={{ background: "var(--surface-3)", color: "#a5b4fc" }}
            >
              demo
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: "var(--text-secondary)" }}>password</span>
            <code
              className="px-2 md:px-3 py-1 rounded-md text-[0.65rem] md:text-xs"
              style={{ background: "var(--surface-3)", color: "#a5b4fc" }}
            >
              1234
            </code>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-20 md:py-28 text-center max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4"
          style={{ letterSpacing: "-0.025em" }}
        >
          Ready to start?
        </h2>
        <p className="text-muted mb-6 md:mb-8 text-sm">
          Experience the next generation of AI conversations.
        </p>
        <Link to="/home">
          <button className="cursor-pointer btn-primary px-8 py-3 md:py-3.5 text-sm md:text-base w-full sm:w-auto">
            Launch App →
          </button>
        </Link>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <img src="/logo.png" alt="" className="h-5 w-5 rounded-full" />
              <span className="font-semibold text-sm">QueryFlow AI</span>
            </div>
            <p className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
              Modern AI chat with streaming responses and advanced reasoning.
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] md:text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--text-tertiary)", letterSpacing: "0.1em" }}>
              Links
            </p>
            <ul className="space-y-2 text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>
                <a
                  href="https://github.com/Uni0Satyam/QueryFlow-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/auth" className="cursor-pointer hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/home" className="cursor-pointer hover:text-white transition-colors">App</Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] md:text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--text-tertiary)", letterSpacing: "0.1em" }}>
              Built by
            </p>
            <p className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>Satyam Kushwaha</p>
          </div>
        </div>
        <div
          className="text-center text-[0.65rem] md:text-xs py-5 md:py-6"
          style={{ color: "var(--text-tertiary)", borderTop: "1px solid var(--border)" }}
        >
          © {new Date().getFullYear()} QueryFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
