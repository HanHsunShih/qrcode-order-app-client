import axios from "axios";

const api_url = import.meta.env.VITE_SERVER_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${api_url}/api/menu`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products data" + error);
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${api_url}/api/menu/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single product data" + error);
  }
};
