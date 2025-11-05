import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customBaseQuery =(basePath: string)=> 
  fetchBaseQuery({
  baseUrl: `${ 'http://10.123.131.250:8080'}/${basePath}`,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('access-token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export default customBaseQuery;