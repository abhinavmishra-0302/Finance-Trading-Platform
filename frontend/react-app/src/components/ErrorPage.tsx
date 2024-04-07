import React from 'react';
import './ErrorPage.css';

const ErrorPage: React.FC = () => {
    return (
        <>
            <header className="container">
                <h1>Error</h1>
            </header>
            <div className="container error-container">
                <img src="cute_error_image.jpg" alt="Cute Error" className="error-image" />
                <p className="error-message">Oops! Something went wrong.</p>
                <p className="error-description">We apologize for the inconvenience. Please try again later.</p>
                <a href="#" className="back-link">Go Back</a>
            </div>
            <footer>
                <div className="container">
                    <ul className="footer-links">
                        <li><a href="#">Legal Info</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Privacy/Terms</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default ErrorPage;
