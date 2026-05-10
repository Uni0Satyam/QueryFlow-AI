import { useContext, useState } from "react";
import Logo from '/logo.png';
import { AuthContext } from "../../context/AuthContext";
import { BeatLoader } from 'react-spinners';

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { handleSignup, handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  let handleAuth = async () => {
    setLoading(true);
    try {
      setError("");
      if (mode === "login") {
        let result = await handleLogin(formData);
        setMessage(result);
      }
      if (mode === "signup") {
        let result = await handleSignup(formData);
        setMessage(result);
      }
    } catch (e) {
      setMessage("");
      setError(e);
    }
    setLoading(false);
  };

  const onKey = (e) => e.key === "Enter" && handleAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 md:px-6"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="orb"
        style={{
          width: 320,
          height: 320,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <img
            src={Logo}
            alt="QueryFlow"
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl mb-3 md:mb-4 object-cover"
          />
          <h1
            className="text-xl md:text-2xl font-semibold tracking-tight text-white text-center"
            style={{ letterSpacing: "-0.02em" }}
          >
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-xs md:text-sm mt-1 text-center" style={{ color: "var(--text-secondary)" }}>
            {mode === "login"
              ? "Sign in to continue to QueryFlow"
              : "Start chatting with QueryFlow AI"}
          </p>
        </div>

        <div
          className="flex rounded-lg mb-5 md:mb-6 p-1"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); setMessage(""); }}
              className="cursor-pointer flex-1 py-1.5 text-[0.8rem] md:text-sm rounded-md font-medium transition-all"
              style={{
                background: mode === m ? "var(--surface-3)" : "transparent",
                color: mode === m ? "var(--text-primary)" : "var(--text-secondary)",
                border: mode === m ? "1px solid var(--border-hover, rgba(255,255,255,0.12))" : "1px solid transparent",
              }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3 md:space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-[0.65rem] md:text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Email
              </label>
              <input
                type="email"
                className="qf-input py-2 md:py-3 text-sm md:text-base"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={onKey}
              />
            </div>
          )}

          <div>
            <label className="block text-[0.65rem] md:text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Username
            </label>
            <input
              type="text"
              className="qf-input py-2 md:py-3 text-sm md:text-base"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyDown={onKey}
            />
          </div>

          <div>
            <label className="block text-[0.65rem] md:text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Password
            </label>
            <input
              type="password"
              className="qf-input py-2 md:py-3 text-sm md:text-base"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={onKey}
            />
          </div>
        </div>

        {error && (
          <div
            className="mt-3 md:mt-4 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm flex items-center gap-2 md:gap-2.5 animate-fade-in"
            style={{
              background: "var(--red-dim)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
            }}
          >
            <i className="fa-solid fa-circle-exclamation text-[0.65rem] md:text-xs shrink-0" />
            {error}
          </div>
        )}

        {message && (
          <div
            className="mt-3 md:mt-4 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm flex items-center gap-2 md:gap-2.5 animate-fade-in"
            style={{
              background: "var(--green-dim)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#86efac",
            }}
          >
            <i className="fa-solid fa-check text-[0.65rem] md:text-xs shrink-0" />
            {message}
          </div>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className={`btn-primary w-full mt-4 md:mt-5 py-2.5 md:py-3 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading
            ? <BeatLoader color="white" size={7} />
            : mode === "login" ? "Sign in" : "Create account"}
        </button>

        <div className="flex items-center gap-2 md:gap-3 my-4 md:my-5">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[0.65rem] md:text-xs" style={{ color: "var(--text-tertiary)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <button
          className="btn-ghost w-full flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm py-2.5 md:py-3 cursor-not-allowed"
          disabled
          style={{ opacity: 0.4 }}
        >
          <i className="fa-brands fa-google text-[0.65rem] md:text-xs" />
          Continue with Google
          <span className="ml-auto tag text-[0.55rem] md:text-xs px-1.5 md:px-2" style={{ fontSize: "0.65rem" }}>Soon</span>
        </button>

        <p className="text-center text-[0.65rem] md:text-xs mt-6 md:mt-8" style={{ color: "var(--text-tertiary)" }}>
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-white transition-colors cursor-pointer">Terms</a>
          {" "}and{" "}
          <a href="#" className="underline hover:text-white transition-colors cursor-pointer">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
