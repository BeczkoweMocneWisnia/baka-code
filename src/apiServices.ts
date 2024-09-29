import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await fetch(`${Config.REACT_NATIVE_API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const { access } = data;

      // Store the new access token
      await AsyncStorage.setItem('accessToken', access);

      return access;
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const apiRequest = async (url: string, options: RequestInit) => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      accessToken = await refreshAccessToken();
      if (accessToken) {
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error('Error in API request:', error);
    throw error;
  }
};
