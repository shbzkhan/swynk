  import { createApi } from '@reduxjs/toolkit/query/react';
  import customBaseQuery from '../middleware/headerRedux';
  import { CurrentUserResponse, LoginUserResponse, RegisterUserResponse, SendOTPResponse, VerifyOTPResponse } from '../../types/user.types';
  import { formProps } from '../../screens/RegisterScreen';
import { conversationApi } from './conversationApi';

  export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: customBaseQuery('users/'),
    tagTypes:['User','Request'],
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
      //register new user
      register: builder.mutation<RegisterUserResponse, formProps>({
        query: newUser => ({
          url: 'register',
          method: 'POST',
          body: newUser,
        }),
      }),

      // login user api
      login: builder.mutation<LoginUserResponse,{email:string, password: string}>({
        query: user => ({
          url: 'login',
          method: 'POST',
          body: user,
        }),
        async onQueryStarted(arg,{dispatch, queryFulfilled}){
          try {
            await queryFulfilled;
            dispatch(
              conversationApi.util.invalidateTags(['User'])
            );
          } catch (error) {
            console.error('login failed:', error);
          }
        },
      }),

      googleLogin: builder.mutation<LoginUserResponse, { idToken: string, fcmToken:string }>({
        query: ({ idToken, fcmToken }) => ({
          url: 'google-login',
          method: 'POST',
          body: { idToken, fcmToken },
        }),
        async onQueryStarted(arg,{dispatch, queryFulfilled}){
          try {
            await queryFulfilled;
            dispatch(
              conversationApi.util.invalidateTags(['User'])
            );
          } catch (error) {
            console.error('login failed:', error);
          }
        },
      }),
      refreshAccessToken: builder.mutation<any,{ refreshToken: string }>({
        query: ({ refreshToken }) => ({
          url: 'refresh-token',
          method: 'POST',
          body: { refreshToken },
        }),
      }),

      currentUser: builder.query<CurrentUserResponse, void>({
        query: () => ({
          url: 'current',
          method: 'GET',
        }),
      }),
      getSearchedUser: builder.query<any,{ page?: number, query?:string, userId?:string}>({
        query: ({ page = 1, query, userId}) =>
          `search/?page=${page}&limit=10${query && `&query=${encodeURIComponent(query)}`}${userId && `&userId=${userId}`}`,
        transformResponse: (response: { data: any }) => response.data,
        providesTags:['Request'],
      }),
    }),
  });

  export const {
      useOtpSendMutation,
      useOtpVerifyMutation,
      useRegisterMutation,
      useLoginMutation,
      useGoogleLoginMutation,
      useCurrentUserQuery,
      useRefreshAccessTokenMutation,
      useLazyGetSearchedUserQuery,
  } = userApi;
