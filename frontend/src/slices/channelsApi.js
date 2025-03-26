import { createApi } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import baseQueryWithErrorHandling from '../api/baseQuery.js';
import i18n from '../i18n/i18next.js';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(i18n.t('chat.channels.form.success.channelAdded', { name: data.name }));
          // eslint-disable-next-line no-unused-vars, no-empty
        } catch (_) {
        }
      },
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(i18n.t('chat.channels.form.success.channelRemoved'));
          // eslint-disable-next-line no-unused-vars, no-empty, no-shadow
        } catch (_) {
        }
      },
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(i18n.t('chat.channels.form.success.channelRenamed'));
          // eslint-disable-next-line no-unused-vars, no-empty, no-shadow
        } catch (_) {
        }
      },
    }),
    getChannels: builder.query({
      query: () => '/channels',
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useUpdateChannelMutation,
} = channelsApi;
