import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isLoggedIn: false,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.value.isLoggedIn = true;
        }
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
