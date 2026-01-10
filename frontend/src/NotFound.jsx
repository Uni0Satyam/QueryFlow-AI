import './NotFound.css';
import { Player } from "@lottiefiles/react-lottie-player";
import Lonely from "./animation/lonely404.json"

function NotFound() {
    return (
        <section className="section">
            <Player
                autoplay
                loop
                src={Lonely}
                className="animation"
            />
            <div className='textDiv'>
                <p>Page Not Found <a href="/" className='link'>Visit home &larr;</a></p>
            </div>
        </section>
    );
}

export default NotFound;