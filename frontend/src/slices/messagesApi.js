import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithErrorHandling from '../api/baseQuery.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...message }) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
