// src/components/DashboardPage.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import './DashboardPage.css';
import stockerLogo from './images/stocker-logo.svg';

const DashboardPage: React.FC = () => {
    const dashboard = useSelector((state: RootState) => state.dashboard);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const handleSearch = () => {
        // Implement search functionality
        console.log('Searching for:', searchTerm);
    };

    const handleStockSelect = (stock: string) => {
        setSelectedStock(stock);
        // Fetch information for the selected stock
        console.log('Selected stock:', stock);
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
                            <p>Nifty50: {dashboard.nifty50}</p>
                            <p>Sensex: {dashboard.sensex}</p>
                        </div>
                        <div className="mini-portfolio">
                            <h2>Mini Portfolio</h2>
                            <p>Total Returns: {dashboard.totalReturns}</p>
                            <p>Current Value: {dashboard.currentValue}</p>
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
                                    <th>Current Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboard.holdings.map((holding, index) => (
                                    <tr key={index}>
                                        <td>{holding.symbol}</td>
                                        <td>{holding.shares}</td>
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
