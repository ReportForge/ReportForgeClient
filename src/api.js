// api.js
import axios from 'axios';
import { useCallback} from 'react';

const baseURL = 'http://localhost:5000';

const client = axios.create({
  baseURL: 'https://eye-of-the-enemy.com/api/'
});


export function useApi() {

  const login = async (email, password) => {
    const response = await axios.post(`https://eye-of-the-enemy.com/api/AppUsers/loginWithoutCaptcha`, { email, password }, { withCredentials: true });
    return response.data;
  };

  const logout = async () => {
    // Retrieve the access token from local storage
    const accessTokenRaw = localStorage.getItem('loginResult');
  
    // Parse JSON string back to object
    const accessToken = JSON.parse(accessTokenRaw);
  
    if (!accessToken) {
      throw new Error('No access token found');
    }
  
    // Set the access token in the Axios instance's default headers
    client.defaults.headers.common['Authorization'] = accessToken.id;
  
    // Use the Axios instance to make the request
    await client.post('AppUsers/logout');
  
    // Remove the access token from local storage
    localStorage.removeItem('loginResult');
  };
  


  const createScenario = async (scenario) => {
    return await axios.post(`${baseURL}/scenarios`, scenario);
  };

  const getScenarios = useCallback(async () => {
    return await axios.get(`${baseURL}/scenarios`);
  }, []);

  const updateScenario = async (id, scenario) => {
    return await axios.put(`${baseURL}/scenarios/${id}`, scenario);
  };

  const deleteScenario = async (id) => {
    return await axios.delete(`${baseURL}/scenarios/${id}`);
  };

  const getLatestScenarioNumber = async () => {
    return await axios.get(`${baseURL}/scenarios/latest-number`);
  };

  const approveScenario = async (id) => {
    return await axios.put(`${baseURL}/scenarios/approve/${id}`);
  };

  const disapproveScenario = async (id) => {
    return await axios.put(`${baseURL}/scenarios/disapprove/${id}`);
  };

   // HebrewScenario functions
   const createHebrewScenario = async (hebrewScenario) => {
    return await axios.post(`${baseURL}/hebrewScenario`, hebrewScenario);
  };

  const getHebrewScenarios = useCallback(async () => {
    return await axios.get(`${baseURL}/hebrewScenario`);
  }, []);

  const updateHebrewScenario = async (id, hebrewScenario) => {
    return await axios.put(`${baseURL}/hebrewScenario/${id}`, hebrewScenario);
  };

  const deleteHebrewScenario = async (id) => {
    return await axios.delete(`${baseURL}/hebrewScenario/${id}`);
  };

  const getLatestHebrewScenarioNumber = async () => {
    return await axios.get(`${baseURL}/hebrewScenario/latest-number`);
  };

  const approveHebrewScenario = async (id) => {
    return await axios.put(`${baseURL}/hebrewScenario/approve/${id}`);
  };

  const disapproveHebrewScenario = async (id) => {
    return await axios.put(`${baseURL}/hebrewScenario/disapprove/${id}`);
  };

  return {
    logout,
    login,
    createScenario,
    getScenarios,
    updateScenario,
    deleteScenario,
    getLatestScenarioNumber,
    approveScenario,
    disapproveScenario,
    createHebrewScenario,
    getHebrewScenarios,
    updateHebrewScenario,
    deleteHebrewScenario,
    getLatestHebrewScenarioNumber,
    approveHebrewScenario,
    disapproveHebrewScenario
  };
}
