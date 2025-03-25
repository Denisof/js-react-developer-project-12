import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null
};

const renamingChannelSlice = createSlice({
  name: 'renamingChannel',
  initialState,
  reducers: {
    setRenamingChannel: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const {setRenamingChannel} = renamingChannelSlice.actions;

export default renamingChannelSlice.reducer;
