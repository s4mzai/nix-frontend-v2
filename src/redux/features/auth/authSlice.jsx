import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userRegister, getCurrentUser } from './authActions';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
    loading: false,
    user: null,
    token,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data.user;
            state.token = payload.data.accessToken;
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })

        //register user
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })

        //get curent user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
        })
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
    }
})

export default authSlice;