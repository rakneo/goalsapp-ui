import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getAllGoals = async () => {
  const response = await axios.get(`${BASE_URL}/goal/`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};

export const createGoal = async (data) => {
  const response = await axios.post(`${BASE_URL}/goal/`, data);

  if (response.status !== 201) {
    throw new Error(response.data.message);
  }

  return response.data;

};

export const getGoalById = async (id) => {
  const response = await axios.get(`${BASE_URL}/goal/${id}`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};


export const updateGoalById = async ({goalId, values}) => {

  const response = await axios.put(`${BASE_URL}/goal/${goalId}`, values);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};


export const deleteGoalById = async (id) => {
  const response = await axios.delete(`${BASE_URL}/goal/${id}`);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;

};
