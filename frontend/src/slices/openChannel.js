import {createSlice, current} from '@reduxjs/toolkit';
import {channelsApi} from './channelsApi';

const initialState = {
  value: null
};

const openChannelSlice = createSlice({
  name: 'openChannel',
  initialState,
  reducers: {
    setOpenChannel: (state, action) => {
      state.value = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.removeChannel.matchFulfilled,
      (state, action) => {
        const removedChannelId = action.payload.id;
        const channel = current(state.value)
        if (channel.id === removedChannelId) {
          state.value = null;
        }
      }
    );
    builder.addMatcher(
      channelsApi.endpoints.removeChannel.matchFulfilled,
      (state, action) => {
        const renamedChannel = action.payload.id;
        const channel = current(state.value)
        if (channel.id === renamedChannel) {
          state.value = null;
        }
      }
    );
  },

});

export const {setOpenChannel} = openChannelSlice.actions;

export default openChannelSlice.reducer;

