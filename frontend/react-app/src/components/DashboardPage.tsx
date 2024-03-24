import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import stockerLogo from './images/stocker-logo.svg';
import {useLocation} from "react-router-dom";

const DashboardPage: React.FC = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Fetch dashboard data from API when component mounts
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const userId = location.state?.userId;

            const jwtToken = getCookie('jwtToken');

            console.log('JWT Token:', jwtToken);

            const response = await fetch(`http://localhost:3000/portfolio/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            }); // Change the URL as per your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }
            const data = await response.json();
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const getCookie = (name: string) => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null;
    };

    const handleSearch = () => {
        // Implement search functionality
        console.log('Searching for:', searchTerm);
    };

    const toggleAccountDropdown = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <div className="logo-container">
                    <img src={stockerLogo} alt="Stocker Logo" className="logo-image" />
                </div>
                <div className="account-dropdown">
                    <button className="account-button" onClick={toggleAccountDropdown}>Account</button>
                    {isAccountOpen && (
                        <div className="dropdown-content">
                            <button className="dropdown-item">Portfolio</button>
                            <button className="dropdown-item">Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <h1>Dashboard</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="index-mini-portfolio">
                        <div className="index">
                            <h2>Index</h2>
                            <p>Nifty50: 0</p>
                            <p>Sensex: 0</p>
                        </div>
                        <div className="mini-portfolio">
                            <h2>Mini Portfolio</h2>
                            <p>Total Returns: 0</p>
                            <p>Current Value: 0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Holdings</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Shares</th>
                                <th>Avg. Price</th>
                                <th>Market Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dashboardData && dashboardData.map((holding, index) => (
                                <tr key={index}>
                                    <td>{holding.symbol}</td>
                                    <td>{holding.quantity}</td>
                                    <td>{holding.avgPrice}</td>
                                    <td>{holding.marketPrice}</td>
                                    <td>{holding.currentPrice}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for stocks..."
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {selectedStock && (
                <div className="selected-stock">
                    <h2>Selected Stock: {selectedStock}</h2>
                    {/* Display additional information about the selected stock */}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
