import axios from 'axios';
import {getItem} from './src/srceen/utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.0.2.2:8000/api/'; // Replace with your API base URL

const getAccessToken = async () => {
  try {
    const token = await getItem('access_token');
    return JSON.parse(token);
  } catch (error) {
    console.error('Error retrieving access token:', error);
    throw error;
  }
};

const getAccessTokenClient = async () => {
  try {
    const token = await getItem('client_access_token');
    console.log(token);
    return JSON.parse(token);
  } catch (error) {
    console.error('Error retrieving access token:', error);
    throw error;
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async config => {
  try {
    const accessToken = await getAccessToken();
    const clientAccessToken = await getAccessTokenClient();

    if (accessToken) {
      //console.log(accessToken, 'dfvdfdfdfdhdfgsf');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (clientAccessToken) {
      config.headers.Authorization = `Bearer ${clientAccessToken}`;
    }
  } catch (error) {
    console.error('Error setting Authorization header:', error);
  }
  // console.log(config, '99999999999999999999');
  return config;
});

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     console.log('Interceptor Error:', error);

//     const originalRequest = error.config;

//     console.log('data===========', originalRequest);
//     // Check if the error is due to an expired token
//     if (error.response.status === 401 && !originalRequest._retry) {
//       console.log('Token expired. Attempting refresh.');

//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token
//         console.log('New access token:', newAccessToken);
//         const newAccessToken = await refreshAccessToken();
//         console.log('New access token:', newAccessToken);

//         // Update the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         // Retry the original request
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.log('Error refreshing access token:', refreshError);

//         // Handle the case where token refresh fails, e.g., redirect to login
//         // You can customize this part based on your application's requirements
//         throw refreshError;
//       }
//     }

//     // If the error is not due to an expired token, simply propagate the error
//     return Promise.reject(error);
//   },
// );

export const fetchItems = async endpoint => await api.get(endpoint);

export const fetchItemById = async (endpoint, itemId) =>
  await api.get(`${endpoint}/${itemId}`);

export const createItem = async (endpoint, item) =>
  await api.post(endpoint, item);

export const updateItem = async (endpoint, itemId, item) =>
  await api.put(`${endpoint}/${itemId}`, item);

export const editItem = async (endpoint, item) =>
  await api.put(`${endpoint}`, item);

export const deleteItem = async (endpoint, itemId) =>
  await api.delete(`${endpoint}/${itemId}`);

export async function refreshAccessToken() {
  try {
    // Make a request to your server to refresh the access token
    console.log('dssfsdfdfsdffsf', newAccessToken);
    const response = await axios.post(`http://10.0.2.2:8000/api/refresh`); // Replace with your actual refresh token endpoint
    console.log('dssfsdfdfsdffsf', newAccessToken);
    // Assuming the server responds with a new access token
    const newAccessToken = response.data.refresh_token;

    console.log('dssfsdfdfsdffsf', newAccessToken);
    // Store the new access token (e.g., in localStorage or a state management system)
    // Replace this with your actual token storage mechanism
    localStorage.setItem('refresh_token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // Handle the error, e.g., redirect to login page or log out the user
    console.error('Error refreshing access token:', error);
    console.error('Error refreshing access token:', error.message);
    throw error;
  }
}

const apis = {
  fetchItems,
  fetchItemById,
  createItem,
  updateItem,
  deleteItem,
};

export default apis;
