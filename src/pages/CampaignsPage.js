import React, { useState, useEffect } from 'react';
import { getUserCampaigns, deleteCampaign } from '../services/api';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';

const CampaignsPage = ({ userId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const fetchCampaigns = async () => {
    const response = await getUserCampaigns(userId);
    setCampaigns(response.data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSave = () => {
    fetchCampaigns();
    setEditingCampaign(null);
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
  };

  const handleDelete = async (id) => {
    await deleteCampaign(id);
    fetchCampaigns();
  };

  return (
    <div>
      <h1>Your Campaigns</h1>
      <CampaignList campaigns={campaigns} onEdit={handleEdit} onDelete={handleDelete} />
      <h2>{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
      <CampaignForm campaign={editingCampaign} onSave={handleSave} />
    </div>
  );
};

export default CampaignsPage;
