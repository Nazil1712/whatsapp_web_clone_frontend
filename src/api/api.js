import axios from "axios";

const BASE_URL = "http://localhost:5000"; // change this to your hosted URL on deployment

export const fetchConversations = () => axios.get(`${BASE_URL}/api/conversations`);
export const fetchMessages = (wa_id) => axios.get(`${BASE_URL}/api/messages/${wa_id}`);
export const sendMessage = (data) => axios.post(`${BASE_URL}/api/send`, data);
