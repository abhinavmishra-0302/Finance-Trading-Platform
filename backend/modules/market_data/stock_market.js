const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get('/stock_data/real_time', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
        params: {
            trend_type: 'MARKET_INDEXES',
            country: 'us',
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': '12af9a1b35msh417c89fc1c1d3cep1f3e6cjsn5cad1f952390',
            'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router