import axios from "axios";

const API_URL = "http://localhost:8080/api";

const HomePageUtils = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserCampaigns = (userId) =>
  HomePageUtils.get(`/campaigns/user/${userId}`);
export const getUserFunds = (userId) =>
  HomePageUtils.get(`/users/funds/${userId}`);
export const deleteCampaign = (id) => HomePageUtils.delete(`/campaigns/${id}`);

export default HomePageUtils;