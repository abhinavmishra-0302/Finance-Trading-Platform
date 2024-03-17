// src/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import custom CSS file for styling

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <div className="logo-container">
                <img src="/src/components/images/stocker-logo.svg" alt="Stocker Logo" className="logo-image" />
                <div className="logo-text">Stocker</div>
            </div>
            <div className="button-container">
                <Link to="/get-started" className="btn btn-primary btn-lg">Get Started</Link>
            </div>
            <div className="catchy-phrase">
                <h1>Invest. Grow. Thrive.</h1>
                <h1>Your financial journey starts here.</h1>
                <h1>Join Stocker and reach new heights.</h1>
            </div>
            <div className="big-image">
                <img src="src/components/images/landing_page1.jpg" alt="Big Image" className="big-image" />
            </div>

            <div className="additional-content">
                <div className="text">
                    <h2>Make Smart Decisions</h2>
                    <p>Get expert advice from AI and algorithms to make informed investment decisions. Whether you're a seasoned investor or just starting out, Stocker provides the tools and resources you need to succeed.</p>
                </div>
                <div className="image">
                    <img src="src/components/images/landing_page3.jpg" alt="Additional Image" />
                </div>
            </div>

            <div className="additional-content">
                <div className="text">
                    <h2>Indian markets at your fingertips</h2>
                    <p>Long-term or short-term, high risk or low risk. Be the kind of investor you want to be.</p>
                </div>
                <div className="image">
                    <img src="src/components/images/landing_page2.jpg" alt="Additional Image" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
