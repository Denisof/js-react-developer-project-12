import { createSelector } from 'reselect';
import { channelsApi } from '../slices/channelsApi.js';
import filterText from '../utils/filter.js';

export const selectChannels = createSelector(
  channelsApi.endpoints.getChannels.select(),
  (result) => {
    if (!result?.data) return [];

    return result.data.map((channel) => ({
      ...channel,
      name: filterText(channel.name),
    }));
  }
);
