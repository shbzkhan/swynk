import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../middleware/headerRedux';

export const requestApi = createApi({
  reducerPath: 'request',
  baseQuery: customBaseQuery('requests/'),
  endpoints: builder => ({
    //conversation get;

   getUserRequests: builder.query<
      any,
      void
    >({
      query: () =>
        '',
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
    useGetUserRequestsQuery,
} = requestApi;
