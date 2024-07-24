import React, { useState, useEffect } from "react";
import {
  getUserCampaigns,
  deleteCampaign,
  getUserFunds,
} from "../utils/HomePageUtils";
import { useNavigate } from "react-router-dom";
import UserProfile from "../utils/UserProfile";
import NavBar from "../layout/NavBar";
import "../style/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [userFunds, setUserFunds] = useState([]);

  useEffect(() => {
    const userId = UserProfile.getUserId();
    if (userId === -1) {
      navigate("/");
    } else {
      const fetchCampaigns = async () => {
        const response = await getUserCampaigns(userId);
        setCampaigns(response.data);
      };
      const fetchFunds = async () => {
        const response = await getUserFunds(userId);
        setUserFunds(response.data);
      };
      fetchCampaigns();
      fetchFunds();
    }
  }, []);

  const handleDelete = async (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await deleteCampaign(campaignId);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
    }
  };

  const handleEdit = (campaignId) => {
    navigate(`/edit-campaign/${campaignId}`);
  };

  return (
    <div>
      <NavBar />
      <div className="homepage">
        <h1>Account funds: {userFunds}$</h1>
        <h2 className="home-campaigns">YOUR CAMPAIGNS:</h2>
        <div className="campaign-container">
          {campaigns.length === 0 ? (
            <p>You don't have any campaigns.</p>
          ) : (
            <div className="campaign-grid">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-item">
                  <h3>{campaign.name}</h3>
                  <p>
                    <strong>Keywords:</strong> {campaign.keywords}
                  </p>
                  <p>
                    <strong>Bid Amount:</strong> {campaign.bidAmount}$
                  </p>
                  <p>
                    <strong>Campaign Fund:</strong> {campaign.campaignFund}$
                  </p>
                  <p>
                    <strong>Status:</strong> {campaign.status ? "ON" : "OFF"}
                  </p>
                  <p>
                    <strong>Town:</strong> {campaign.town}
                  </p>
                  <p>
                    <strong>Radius:</strong> {campaign.radius} km
                  </p>
                  <div className="campaign-actions">
                    <button
                      onClick={() => handleEdit(campaign.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;