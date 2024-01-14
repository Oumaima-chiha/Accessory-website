import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

customAxios.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Corrected space in 'accessToken'
      console.warn(accessToken);
      if (accessToken !== null) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
      }

      return config;
    } catch (error) {
      console.error('Error retrieving accessToken from AsyncStorage:', error);
      throw error; // Rethrow the error to indicate that there was an issue with the interceptor
    }
  },
  (error) => {
    // Handle request errors
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

export default customAxios;