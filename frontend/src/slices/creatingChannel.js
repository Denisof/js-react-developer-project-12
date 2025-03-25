import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null
};

const creatingChannelSlice = createSlice({
  name: 'creatingChannel',
  initialState,
  reducers: {
    setCreatingChannel: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const {setCreatingChannel} = creatingChannelSlice.actions;

export default creatingChannelSlice.reducer;
