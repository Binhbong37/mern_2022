import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrappers from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
const Landing = () => {
    return (
        <Wrappers>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>tracking</span> App
                    </h1>
                    <p>lorem...</p>
                    <Link to="/register" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrappers>
    );
};

export default Landing;
