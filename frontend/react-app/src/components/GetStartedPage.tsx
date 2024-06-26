import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './GetStartedPage.css';

const GetStartedPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const [isLoading, setIsLoading] = useState(true); // State to track loading state

    useEffect(() => {
        const jwtToken = getCookie('jwtToken'); // Get JWT token from cookie
        if (jwtToken) {
            // JWT token cookie is present, redirect to dashboard page
            navigate('/dashboard');
        } else {
            // JWT token cookie is not present, allow rendering of the GetStartedPage component
            setIsLoading(false);
        }
    }, [navigate]);

    if (isLoading) {
        return null; // Return null while checking token validity
    }

    function getCookie(name: string) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

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
                        credentials: 'include',
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Login successful:', data);
                        navigate('/dashboard', { state: { userId: data.userId } }); // Navigate to Dashboard upon successful login
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
