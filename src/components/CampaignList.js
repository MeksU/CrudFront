import React from 'react';

const CampaignList = ({ campaigns, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Your Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h3>{campaign.name}</h3>
            <p>{campaign.keywords}</p>
            <button onClick={() => onEdit(campaign)}>Edit</button>
            <button onClick={() => onDelete(campaign.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
