import { useContext, useState } from "react";
import './Auth.css';
import Logo from '/logo.png'
import { AuthContext } from "./AuthContext";

export default function AuthPage() {

  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  let [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { handleSignup, handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  }

  let handleAuth = async () => {
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
  }

  return (
    <div className="page">
      <div className="card" >
        <img
          src={Logo}
          alt="logo"
          className="oauth-logo"
        />

        <h1 className="oauth-heading">{mode === "login" ? "Welcome back" : "Create your account"}</h1>

        {mode === "signup" && (
          <input type="email" placeholder="Enter email" className="input" name="email" value={formData.email} onChange={handleInputChange} onKeyDown={(e) => e.key === 'Enter' ? handleAuth() : '' } required />
        )}
        <input type="text" placeholder="Username" className="input" name="username" value={formData.username} onChange={handleInputChange} onKeyDown={(e) => e.key === 'Enter' ? handleAuth() : '' } required />
        <input type="password" placeholder="Password" className="input" name="password" value={formData.password} onChange={handleInputChange} onKeyDown={(e) => e.key === 'Enter' ? handleAuth() : '' } required />
        {error &&
          <div className="err-box">
            <p className="err-msg"><i className="fa-solid fa-circle-exclamation" style={{ marginRight: "1rem" }}></i>{error}</p>
          </div>
        }
        {message &&
          <div className="success-box">
            <p className="sucess-msg"><i className="fa-solid fa-check" style={{ marginRight: "1rem" }}></i>{message}</p>
          </div>
        }
        <div className="primary" onClick={handleAuth}>Continue</div>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="oauth google">Continue with Google<i className="fa-brands fa-google"></i></button>

        <p className="switch">
          {mode === "login" ? (
            <>Don’t have an account? <span onClick={() => setMode("signup")}>Sign up</span></>
          ) : (
            <>Already have an account? <span onClick={() => setMode("login")}>Log in</span></>
          )}
        </p>

        <p className="terms">
          By continuing, you agree to our <a>Terms</a> and <a>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}