const WebSocket = require('ws');

const socket = new WebSocket('wss://ws.finnhub.io?token=cnr7kdpr01qs2jr5l1tgcnr7kdpr01qs2jr5l1u0');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    console.log('Connected to Finnhub WebSocket API');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from Finnhub server:', event.data);
});

// Function to subscribe to a stock symbol
function subscribeStock(symbol) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}));
}

module.exports = {
    subscribeStock
};
