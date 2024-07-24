import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../utils/UserProfile";
import NavBar from "../layout/NavBar";
import "../style/AddEditCampaign.css";

const EditCampaign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [campaignFund, setCampaignFund] = useState("");
  const [status, setStatus] = useState(true);
  const [town, setTown] = useState("");
  const [radius, setRadius] = useState("");
  const [error, setError] = useState("");
  const [towns, setTowns] = useState([]);
  const user = UserProfile.getUserId();

  useEffect(() => {
    if (user === -1) {
      navigate("/");
      return;
    }
    const fetchOptions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/data");
        if (!response.ok) throw new Error("Failed to fetch options");
        const data = await response.json();
        setTowns(data.towns);
        setKeywords(data.keywords);
      } catch (error) {
        setError("Failed to load options.");
      }
    };

    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/campaigns/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch campaign");
        const campaign = await response.json();
        if (campaign.user.id != user) {
          navigate("/home");
          return;
        }
        setName(campaign.name);
        setKeywords(campaign.keywords);
        setBidAmount(campaign.bidAmount);
        setCampaignFund(campaign.campaignFund);
        setStatus(campaign.status);
        setTown(campaign.town);
        setRadius(campaign.radius);
      } catch (error) {
        setError("Failed to load campaign.");
      }
    };

    fetchOptions();
    fetchCampaign();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/campaigns/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            keywords,
            bidAmount,
            campaignFund,
            status,
            town,
            radius,
            user,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        const err = errorData
          .replace("[", "")
          .replace("]", "")
          .replace(/"/g, "")
          .replace(",", "\n");
        setError(err);
        return;
      }

      navigate("/home");
    } catch (error) {
      setError("Failed to update campaign!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="add-campaign-page">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Edit Campaign</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div>
              <label>Bid Amount</label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Campaign Fund</label>
              <input
                type="number"
                value={campaignFund}
                onChange={(e) => setCampaignFund(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Status</label>
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </div>
            <div>
              <label>Town</label>
              <br />
              <select
                value={town}
                onChange={(e) => setTown(e.target.value)}
                required
              >
                <option value="">Select town</option>
                {towns.map((townOption, index) => (
                  <option key={index} value={townOption}>
                    {townOption}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Radius</label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Update Campaign</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCampaign;