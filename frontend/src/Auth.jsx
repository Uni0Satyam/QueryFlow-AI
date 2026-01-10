import { useState } from "react";
import './Auth.css';
import Logo from '/logo.png'
import { Link, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  let [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  }

  const handleSignup = async() => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signup', options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="page">
      <div className="card">
        <img
          src={Logo}
          alt="logo"
          className="oauth-logo"
        />

        <h1 className="oauth-heading">{mode === "login" ? "Welcome back" : "Create your account"}</h1>

        {mode === "signup" && (
          <input type="email" placeholder="Enter email" className="input" name="email" value={formData.email} onChange={handleInputChange} required />
        )}
        <input type="text" placeholder="Username" className="input" name="username" value={formData.username} onChange={handleInputChange} required />
        <input type="password" placeholder="Password" className="input" name="password" value={formData.password} onChange={handleInputChange} required />
        <div className="primary" onClick={handleSignup}>Continue</div>

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