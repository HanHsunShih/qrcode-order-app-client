import axios from "axios";

export const getAllProducts = async () => {
  const api_url = import.meta.env.VITE_SERVER_URL;
  try {
    const response = await axios.get(`${api_url}/api/menu`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products data" + error);
  }
};
