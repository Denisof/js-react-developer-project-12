import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const removingChannelSlice = createSlice({
  name: 'removingChannel',
  initialState,
  reducers: {
    setRemovingChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setRemovingChannel } = removingChannelSlice.actions;

export default removingChannelSlice.reducer;
