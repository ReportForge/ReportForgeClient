// api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000'; // replace this with your actual server URL

export function useApi() {
  const createScenario = async (scenario) => {
    return await axios.post(`${baseURL}/scenarios`, scenario);
  };

  const getScenarios = async () => {
    return await axios.get(`${baseURL}/scenarios`);
  };

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

  return { 
    createScenario,
    getScenarios,
    updateScenario,
    deleteScenario,
    getLatestScenarioNumber,
    approveScenario,
    disapproveScenario 
  };
}
