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

export const getProcessingOrders = async (authToken) => {
  try {
    const response = await axios.get(`${api_url}/api/order`, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });

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

export const creatNewUser = async (Data) => {
  try {
    await axios.post(`${api_url}/api/users/register`, Data);
  } catch (error) {
    console.log("Error creating new user, error: " + error);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/users/login`, data);
    return response;
  } catch (error) {
    console.log(`Error login, error: ${error}`);
  }
};
