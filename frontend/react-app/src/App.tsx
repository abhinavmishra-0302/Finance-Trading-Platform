// src/App.tsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GetStartedPage from './components/GetStartedPage';
import DashboardPage from './components/DashboardPage'; // Import the new DashboardPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Add the Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
