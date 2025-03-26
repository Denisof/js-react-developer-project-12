import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const creatingChannelSlice = createSlice({
  name: 'creatingChannel',
  initialState,
  reducers: {
    setCreatingChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setCreatingChannel } = creatingChannelSlice.actions;

export default creatingChannelSlice.reducer;
