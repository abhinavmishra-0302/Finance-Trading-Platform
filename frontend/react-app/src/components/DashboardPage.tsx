import React, {useState, useEffect} from 'react';
import './DashboardPage.css';
import stockerLogo from './images/stocker-logo.svg';
import accountIcon from './images/account.png';
import {Avatar, Input, InputGroup, Table} from 'rsuite';
import UserIcon from '@rsuite/icons/legacy/User';
import SearchIcon from '@rsuite/icons/Search';

import "rsuite/dist/rsuite.min.css";
import SearchBar from "./SearchBar.tsx";
import {combineSlices} from "@reduxjs/toolkit";

const DashboardPage: React.FC = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [symbols, setSymbols] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [holding, setHolding] = useState('');


    useEffect(() => {
        // Fetch dashboard data from API when component mounts
        fetchDashboardData()
        fetchSymbols()
        fetchHolding()
    }, []);


    const {Column, HeaderCell, Cell} = Table;

    const fetchSymbols = async () => {
        try {
            const response = await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cnr7kdpr01qs2jr5l1tgcnr7kdpr01qs2jr5l1u0');
            if (!response.ok) {
                throw new Error('Failed to fetch symbols');
            }
            const data = await response.json();
            // @ts-ignore
            const symbolNames = await data.map(symbol => symbol.description.charAt(0) + symbol.description.substring(1).toLowerCase());
            setSymbols(symbolNames);
        } catch (error) {
            console.error('Error fetching symbols:', error);
        }
    };

    const fetchHolding = async () => {
        try {
            const userId = getCookie('userId');
            const jwtToken = getCookie('jwtToken');
            const response = await fetch(`http://localhost:3000/portfolio/holding/${userId}`, {
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
            setHolding(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    // @ts-ignore
    const handleSelectSymbol = (symbol) => {
        setSelectedSymbol(symbol);
        // Do something with the selected symbol
    };

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
            console.log(data)
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
                    <img src={stockerLogo} alt="Stocker Logo" className="logo-image"/>
                </div>
                <div className="search-bar">
                    <SearchBar symbols={symbols} onSelect={handleSelectSymbol} />
                </div>
                <div className="account-dropdown">
                    <button className="account-button" onClick={toggleAccountDropdown}>
                        <img src={accountIcon} alt="Stocker Logo" className="logo-image" height={50} width={50}/>
                    </button>
                    {isAccountOpen && (
                        <div className="dropdown-content">
                            <button className="dropdown-item">Portfolio</button>
                            <button className="dropdown-item">Logout</button>
                        </div>
                    )}
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
                    {dashboardData && (<h2><b>Holdings ({dashboardData.length})</b></h2>)}
                    <div className="table-container">
                        {dashboardData && (<Table
                            height={400}
                            data={dashboardData}
                            onRowClick={rowData => {
                                console.log(rowData);
                            }}
                        >
                            <Column flexGrow={1} align="center" resizable={true}>
                                <HeaderCell height={75} style={{
                                    fontSize: '18px',
                                    fontWeight: "bold",
                                    color: 'rgb(8, 14, 44)',
                                    backgroundColor: 'rgb(137, 196, 244)',
                                    alignContent: "center"
                                }}>Symbol</HeaderCell>
                                <Cell dataKey="symbol" style={{fontSize: '15px'}}/>
                            </Column>

                            <Column flexGrow={1} align="center" resizable={true}>
                                <HeaderCell height={75} style={{
                                    fontSize: '18px',
                                    fontWeight: "bold",
                                    color: 'rgb(8, 14, 44)',
                                    backgroundColor: 'rgb(137, 196, 244)',
                                    alignContent: "center"
                                }}>Shares</HeaderCell>
                                <Cell dataKey="quantity" style={{fontSize: '15px'}}/>
                            </Column>

                            <Column flexGrow={1} align="center" resizable={true}>
                                <HeaderCell height={75} style={{
                                    fontSize: '18px',
                                    fontWeight: "bold",
                                    color: 'rgb(8, 14, 44)',
                                    backgroundColor: 'rgb(137, 196, 244)',
                                    alignContent: "center"
                                }}>Average
                                    Price</HeaderCell>
                                <Cell dataKey="avgPrice" style={{fontSize: '15px'}}/>
                            </Column>

                            <Column flexGrow={1} align="center" resizable={true}>
                                <HeaderCell height={75} style={{
                                    fontSize: '18px',
                                    fontWeight: "bold",
                                    color: 'rgb(8, 14, 44)',
                                    backgroundColor: 'rgb(137, 196, 244)',
                                    alignContent: "center"
                                }}>Market
                                    Price</HeaderCell>
                                <Cell dataKey="marketPrice" style={{fontSize: '15px'}}/>
                            </Column>
                        </Table>)}

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Mini Portfolio</h2>
                            {holding && (<div className="portfolio-info">
                                <div className="portfolio-item">
                                    <p className="portfolio-name">Balance Remaining</p>
                                    <p className="portfolio-value">₹ {holding.balance}</p>
                                </div>
                                <div className="portfolio-item">
                                    <p className="portfolio-name">Holdings Value</p>
                                    <p className="portfolio-value">₹ {holding.holdingValue}</p>
                                </div>
                            </div>)}
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
