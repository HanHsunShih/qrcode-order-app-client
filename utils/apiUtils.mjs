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

export const getProcessingOrders = async () => {
  try {
    const response = await axios.get(`${api_url}/api/order`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data, error: " + error);
  }
};

export const changeStatus = async (statusChange) => {
  try {
    const response = await axios.put(`${api_url}/api/order`, statusChange);
    return response.data;
  } catch (error) {
    console.log(`Error changing status, error: ${error}`);
  }
};

export const getCompletedOrders = async () => {
  try {
    const response = await axios.get(`${api_url}/api/order/history`);
    return response.data;
  } catch (error) {
    console.log("Error fetching completed orders data, error: " + error);
  }
};
