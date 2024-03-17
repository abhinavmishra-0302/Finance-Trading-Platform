import React, { useState } from 'react';
import './GetStartedPage.css'; // Import custom CSS file for styling

const GetStartedPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleGetStarted = () => {
        if (isExistingUser) {
            // Handle login logic
            console.log('Email entered:', email);
            console.log('Password entered:', password);
        } else {
            // Handle signup logic
            console.log('Name entered:', name);
            console.log('Email entered:', email);
            console.log('Password entered:', password);
            console.log('Confirm Password entered:', confirmPassword);
        }
    };

    const toggleExistingUser = () => {
        setIsExistingUser(!isExistingUser);
    };

    return (
        <div className="get-started-page" style={{ backgroundImage: `url('/src/components/images/get-started-bg.png')` }}>
            <div className="form-container">
                <h1>Welcome to Stocker</h1>
                {!isExistingUser && <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name" />}
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                {!isExistingUser && <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" />}
                <button className="btn btn-primary btn-lg mt-3" onClick={handleGetStarted}>Get Started</button>
                <p className="mt-3">
                    {isExistingUser ? 'New user? ' : 'Already have an account? '}
                    <span className="link-button" onClick={toggleExistingUser}>{isExistingUser ? 'Sign Up' : 'Login'}</span>
                </p>
            </div>
        </div>
    );
};

export default GetStartedPage;
