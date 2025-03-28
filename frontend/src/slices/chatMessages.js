import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setChatMessages: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setChatMessages } = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
