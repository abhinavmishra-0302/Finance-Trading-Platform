import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import './DashboardPage.css';

const Dashboard = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Groww</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#stocks">Stocks</Nav.Link>
                    <Nav.Link href="#mutualFunds">Mutual Funds</Nav.Link>
                    <Nav.Link href="#fixedDeposits">Fixed Deposits</Nav.Link>
                    <Nav.Link href="#usStocks">US Stocks</Nav.Link>
                </Nav>
                <Form>
                    <FormControl type="text" placeholder="What are you looking for today?" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
            <Container>
                <Row>
                    <Col md={8}>
                        {/* Add other components for the rest of the dashboard here */}
                    </Col>
                    <Col md={4}>
                        {/* Add other components for the rest of the dashboard here */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
