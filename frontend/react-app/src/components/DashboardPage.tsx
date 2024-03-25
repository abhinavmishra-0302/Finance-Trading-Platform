import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import stockerLogo from './images/stocker-logo.svg';

const DashboardPage: React.FC = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    useEffect(() => {
        // Fetch dashboard data from API when component mounts
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const userId = getCookie('userId');
            const jwtToken = getCookie('jwtToken');
            const response = await fetch(`http://localhost:3000/portfolio/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
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
                        <img src={stockerLogo} alt="Logo" className="logo-image"/>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." className="search-input"/>
                            <button className="search-button">Search</button>
                </div>
            </div>
            <h1><b>Dashboard</b></h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Index</h2>
                            <div className="index-info">
                                <div className="index-item">
                                    <p className="index-name">Nifty 50</p>
                                    <p className="index-value">0</p>
                                </div>
                                <div className="index-item">
                                    <p className="index-name">Sensex</p>
                                    <p className="index-value">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2><b>Holdings</b></h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Company</th>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Mini Portfolio</h2>
                            <div className="portfolio-info">
                                <div className="portfolio-item">
                                    <p className="portfolio-name">Total Returns</p>
                                    <p className="portfolio-value">0</p>
                                </div>
                                <div className="portfolio-item">
                                    <p className="portfolio-name">Holdings Value</p>
                                    <p className="portfolio-value">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
