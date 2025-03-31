import api from './api';

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};

export const deleteAccount = async () => {
  try {
    const response = await api.delete('/users/account');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete account');
  }
};