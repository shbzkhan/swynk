import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: customBaseQuery('users/'),
  endpoints: builder => ({
    //send otp 
    otpSend: builder.mutation<any, any>({
      query: (email) => ({
        url: 'send-otp',
        method: 'POST',
        body: {email},
      }),
    }),
  }),
});

export const {
    useOtpSendMutation
} = userApi;