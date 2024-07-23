import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CampaignsPage from './pages/CampaignsPage';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/campaigns" 
          element={userId ? <CampaignsPage userId={userId} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;