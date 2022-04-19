import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getAllServers = async () => {
  const response = await axios.get(`${BASE_URL}/server/getAllServers`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};

export const createServer = async (data) => {
  const response = await axios.post(`${BASE_URL}/server/createServer`, data);

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  return response.data;

};

export const getServerById = async (id) => {
  const response = await axios.get(`${BASE_URL}/server/getServerById/${id}`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};


export const updateServerById = async ({serverId, values}) => {

  const response = await axios.put(`${BASE_URL}/server/updateServer/${serverId}`, values);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};


export const deleteServerById = async (id) => {
  const response = await axios.delete(`${BASE_URL}/server/deleteServer/${id}`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};
