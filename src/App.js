import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AddCampaign from './components/AddCampaign';
import EditCampaign from './components/EditCampaign';

const App = () => {
  useEffect(() => {
    document.body.style.zoom = '110%';
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LoginPage/> } />
        <Route path="/home" element={ <HomePage/> } />
        <Route path="/add-campaign" element={ <AddCampaign/> } />
        <Route path="/edit-campaign/:id" element={ <EditCampaign/> } />
        <Route path="*" element={ <HomePage/> } />
      </Routes>
    </Router>
  );
};

export default App;