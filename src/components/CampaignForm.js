import React, { useState, useEffect } from 'react';
import { getPrePopulatedData, createCampaign, updateCampaign } from '../services/api';

const CampaignForm = ({ campaign, onSave }) => {
  const [name, setName] = useState(campaign ? campaign.name : '');
  const [keywords, setKeywords] = useState(campaign ? campaign.keywords : '');
  const [bidAmount, setBidAmount] = useState(campaign ? campaign.bidAmount : '');
  const [campaignFund, setCampaignFund] = useState(campaign ? campaign.campaignFund : '');
  const [status, setStatus] = useState(campaign ? campaign.status : true);
  const [town, setTown] = useState(campaign ? campaign.town : '');
  const [radius, setRadius] = useState(campaign ? campaign.radius : '');
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    const fetchTowns = async () => {
      const response = await getPrePopulatedData();
      setTowns(response.data.towns);
    };
    fetchTowns();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const campaignData = { name, keywords, bidAmount, campaignFund, status, town, radius, user: campaign ? campaign.user.id : null };
    if (campaign) {
      await updateCampaign(campaign.id, campaignData);
    } else {
      await createCampaign(campaignData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Keywords</label>
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
      </div>
      <div>
        <label>Bid Amount</label>
        <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
      </div>
      <div>
        <label>Campaign Fund</label>
        <input type="number" value={campaignFund} onChange={(e) => setCampaignFund(e.target.value)} required />
      </div>
      <div>
        <label>Status</label>
        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
      </div>
      <div>
        <label>Town</label>
        <select value={town} onChange={(e) => setTown(e.target.value)} required>
          {towns.map((townName) => (
            <option key={townName} value={townName}>
              {townName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Radius</label>
        <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} required />
      </div>
      <button type="submit">Save Campaign</button>
    </form>
  );
};

export default CampaignForm;
