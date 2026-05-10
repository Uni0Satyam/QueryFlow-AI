import { Player } from "@lottiefiles/react-lottie-player";
import Lonely from "../../animation/lonely404.json";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 text-center"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="h-72 w-full max-w-sm mb-6 opacity-80">
        <Player
          autoplay
          loop
          src={Lonely}
          className="w-full h-full"
        />
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        Page not found
      </h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: "var(--text-secondary)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="btn-primary px-6 py-2.5 text-sm">
          ← Back to home
        </button>
      </Link>
    </section>
  );
}

export default NotFound;
