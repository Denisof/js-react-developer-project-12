import { createSelector } from 'reselect';
import filterText from '../utils/filter.js';
import { channelsApi } from '../slices/channelsApi.js';

const selectChannels = createSelector(
  channelsApi.endpoints.getChannels.select(),
  (result) => {
    if (!result?.data) return [];

    return result.data.map((channel) => ({
      ...channel,
      name: filterText(channel.name),
    }));
  },
);
export default selectChannels;
