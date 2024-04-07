import React, { useState } from 'react';
import './PaymentAndTransanction.css'; // Import CSS file

const PaymentAndTransanction: React.FC = () => {
    // State for payment form fields
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    // State for modal visibility
    const [modalVisible, setModalVisible] = useState(false);

    // Event handler for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setModalVisible(true); // Show modal
    };

    // Event handlers for input changes
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(e.target.value);
    };

    const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(e.target.value);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvv(e.target.value);
    };

    const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingAddress(e.target.value);
    };

    // Close modal
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="container">
            <header>
                <h1>Payment and Transactions</h1>
            </header>
            <div className="container">
                {/* Payment Form */}
                <form className="payment-form" onSubmit={handleSubmit}>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                        autoComplete="cc-number"
                    />

                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        placeholder="MM/YYYY"
                        required
                        autoComplete="cc-exp"
                    />

                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={3}
                        required
                        autoComplete="cc-csc"
                    />

                    <label htmlFor="billingAddress">Billing Address:</label>
                    <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={billingAddress}
                        onChange={handleBillingAddressChange}
                        required
                        autoComplete="billing street-address"
                    />

                    <input type="submit" value="Submit Payment" />
                </form>

                {/* Modal */}
                {modalVisible && (
                    <div id="confirmationModal" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <div className="payment-confirmation">
                                <h2>Payment Confirmation</h2>
                                <p>Transaction ID: ABC123</p>
                                <p>Total Amount: $100</p>
                                <p>Payment Method: Credit Card</p>
                                <p>Billing Address: 123 Main St, Anytown, USA</p>
                            </div>
                        </div>
                    </div>
                )}
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
        </div>
    );
};

export default PaymentAndTransanction;
