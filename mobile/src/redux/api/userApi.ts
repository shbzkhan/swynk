import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';
import { SendOTPResponse, VerifyOTPResponse } from '../../types/user.types';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: customBaseQuery('users/'),
  endpoints: builder => ({
    //send otp;
    otpSend: builder.mutation<SendOTPResponse, string>({
      query: (email) => ({
        url: 'send-otp',
        method: 'POST',
        body: {email},
      }),
    }),
    otpVerify: builder.mutation<VerifyOTPResponse, {email : string, otp : string}>({
      query: ({email, otp}) => ({
        url: 'verify-otp',
        method: 'POST',
        body: {email, otp},
      }),
    }),
  }),
});

export const {
    useOtpSendMutation,
    useOtpVerifyMutation,
} = userApi;
