import "./home.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <section className="hero">
                <div className="home-container">
                    <img src="/logo.png" alt="QueryFlow" style={{borderRadius: "50%", width: "100px"}}/>
                    <h1>
                        QueryFlow <span>AI</span>
                    </h1>
                    <p>
                        A full-stack AI-powered chat and query management platform inspired by
                        ChatGPT. Secure, scalable, and built with the MERN stack.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/home" style={{ textDecoration: "none" }}><button className="btn btn-primary">Get Started</button></Link>
                        <Link to="https://github.com/Uni0Satyam/QueryFlow-AI" style={{ textDecoration: "none" }} target="_blank"><button className="btn btn-outline">View GitHub</button></Link>
                    </div>
                </div>
            </section>

            <section>
                <div className="home-container">
                    <h2 style={{ textAlign: "center", margin: "3rem", fontSize: "3rem" }}>
                        Features
                    </h2>
                    <div className="features-grid">
                        <div className="feat-card">
                            <div className="card-icon">💬</div>
                            <h3>AI Chat Interface</h3>
                            <p>Chat-based UI with real-time AI-powered responses.</p>
                        </div>
                        <div className="feat-card">
                            <div className="card-icon">🧵</div>
                            <h3>Conversation Threads</h3>
                            <p>Organize conversations with multi-message threads.</p>
                        </div>
                        <div className="feat-card">
                            <div className="card-icon">⚡</div>
                            <h3>Real-time Updates</h3>
                            <p>Fast and responsive interface for seamless experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="home-container" style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 style={{ marginBottom: "1rem" }}>🔐 Demo Access</h2>
                    <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
                        Accessing the chat window requires authentication. To quickly explore
                        QueryFlow AI, you can try it once using the demo account below.
                    </p>
                    <div className="feat-card">
                        <p><strong>Username:</strong> demo</p>
                        <p><strong>Password:</strong> 1234</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="home-container">
                    <h2>Build smarter conversations</h2>
                    <p>
                        QueryFlow AI helps you build secure, scalable AI chat applications
                        with real-world production architecture.
                    </p>
                    <div className="btn-container">
                        <Link to="/home" style={{ textDecoration: "none" }}><button className="btn btn-primary">Launch QueryFlow AI 🚀</button></Link>
                    </div>
                </div>
            </section>


            <footer>
                © {new Date().getFullYear()} QueryFlow AI. Built with ❤️ by Satyam Kushwaha
            </footer>
        </div>
    );
}