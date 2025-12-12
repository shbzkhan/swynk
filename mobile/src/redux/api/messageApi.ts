import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';

export const messageApi = createApi({
  reducerPath: 'message',
  baseQuery: customBaseQuery('messages/'),
  endpoints: builder => ({
    //messages get;
   getMesssages: builder.query<any,{ page?: number, conversationId : string}>({
      query: ({ page = 1, conversationId}) =>
        `${conversationId}/?page=${page}&limit=10`,
      transformResponse: (response: { data: any }) => response.data,
      keepUnusedDataFor:0,
    }),
    sendMessage: builder.mutation<any, {content : string, conversationId:string}>({
          query : ({content, conversationId}) => ({
            url: `${conversationId}`,
            method: 'POST',
            body:{content},
          }),
        }),
  }),
});

export const {
    useGetMesssagesQuery,
    useSendMessageMutation,
} = messageApi;
