import api from './api';

export const getLearningResources = async () => {
  try {
    const response = await api.get('/learning/resources');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch learning resources');
  }
};

export const getLearningResourceById = async (id) => {
  try {
    const response = await api.get(`/learning/resources/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch learning resource');
  }
};

export const completeResource = async (id) => {
  try {
    const response = await api.post(`/learning/resources/${id}/complete`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark resource as completed');
  }
};

export const getUserLearningProgress = async () => {
  try {
    const response = await api.get('/learning/progress');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch learning progress');
  }
};