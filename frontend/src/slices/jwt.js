import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const jwtTokenSlice = createSlice({
  name: 'jwt',
  initialState,
  reducers: {
    setToken: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setToken } = jwtTokenSlice.actions;

export default jwtTokenSlice.reducer;
