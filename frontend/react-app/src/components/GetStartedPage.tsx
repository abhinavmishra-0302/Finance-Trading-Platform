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

    const handleGetStarted = async () => {
        if (isExistingUser) {
            // Handle login logic
            console.log('Email entered:', email);
            console.log('Password entered:', password);

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful:', data);
                    // Optionally, you can redirect the user to another page or perform other actions upon successful login
                } else {
                    const errorData = await response.json();
                    console.error('Error logging in:', errorData);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        } else {
            // Handle signup logic
            console.log('Name entered:', name);
            console.log('Email entered:', email);
            console.log('Password entered:', password);
            console.log('Confirm Password entered:', confirmPassword);

            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, email, password})
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Sign-up successful:', data);
                    // Optionally, you can redirect the user to another page or show a success message
                } else {
                    const errorData = await response.json();
                    console.error('Error signing up:', errorData);
                    // Optionally, you can display an error message to the user
                }
            } catch (error) {
                console.error('Error signing up:', error);
                // Handle network errors or other exceptions
            }
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
