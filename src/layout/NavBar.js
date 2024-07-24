import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../utils/UserProfile";
import "../style/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    UserProfile.setUserId(-1);
    navigate("/");
  };

  const handleAddCampaign = () => {
    navigate("/add-campaign");
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={handleHome}>
        <h1>CampaignRUD</h1>
      </div>
      <div className="navbar-right">
        <span onClick={handleAddCampaign} className="nav-button">
          <strong>Add Campaign</strong>
        </span>
        <span onClick={handleLogout} className="nav-button">
          Logout
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
