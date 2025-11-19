import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';

export const conversationApi = createApi({
  reducerPath: 'conversation',
  baseQuery: customBaseQuery('conversations/'),
  tagTypes:['User','Conversation'],
  endpoints: builder => ({
    //conversation get;

   getConversations: builder.query<any,{ page?: number;}>({
      query: ({ page = 1}) =>
        `?page=${page}&limit=10`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags:['User','Conversation'],
    }),
  }),
});

export const {
    useGetConversationsQuery,
} = conversationApi;
