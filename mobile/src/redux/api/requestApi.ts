import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';
import { userApi } from './userApi';
import { conversationApi } from './conversationApi';

export const requestApi = createApi({
  reducerPath: 'request',
  baseQuery: customBaseQuery('requests/'),
  tagTypes:['Request','Conversation'],
  endpoints: builder => ({
    //conversation get;

   getUserRequests: builder.query<any,void>({
      query: () =>
        '',
      transformResponse: (response: { data: any }) => response.data,
      providesTags:['Request'],
    }),

    sendRequest: builder.mutation<any, {receiverId : string}>({
      query : ({receiverId}) => ({
        url: `send/${receiverId}`,
        method: 'POST',
      }),
      async onQueryStarted(args,{dispatch, queryFulfilled}){
        try {
          await queryFulfilled;
          dispatch(
            userApi.util.invalidateTags(['Request'])
          );
        } catch (error) {
          console.error('send request failed', error);
        }
      },
    }),

    acceptRequest: builder.mutation<any, {requestId:string, status?:string}>({
      query : ({requestId, status = 'accept'}) => ({
        url: `accept/${requestId}`,
        method: 'POST',
        body:{status},
      }),
      invalidatesTags:['Request'],
      async onQueryStarted(args,{dispatch, queryFulfilled}){
        try {
          await queryFulfilled;
          dispatch(
            userApi.util.invalidateTags(['Request'])
          );
          dispatch(
            conversationApi.util.invalidateTags(['Conversation'])
          );
        } catch (error) {
          console.error('send request failed', error);
        }
      },
    }),
  }),
});

export const {
    useGetUserRequestsQuery,
    useSendRequestMutation,
    useAcceptRequestMutation,

} = requestApi;
