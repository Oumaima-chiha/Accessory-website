import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  
  const getTokenFromLocalStorage = () => {
    // Retrieve the token from localStorage or AsyncStorage in Expo
    return AsyncStorage.getItem('accessToken'); 
  }; 
  const baseQuery = fetchBaseQuery({
    baseUrl: `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
    }
    return result;
  };
  
  export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
  });