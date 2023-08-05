import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'loginUser',
    initialState: {
        currentLogin: '',
    },
    reducers: {
        login(state, action) {
            state.currentLogin = action.payload;
        },
        logout(state) {
            state.currentLogin = '';
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;