import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            //store token
            if (data.status === "success") {
                localStorage.setItem('token', data.data.accessToken);
                toast.success(data.message);
                window.location.replace('/')
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error);
            }
        }
    }
)

//register
export const userRegister = createAsyncThunk(
    '/auth/register',
    async ({ name,
        email,
        password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/register', {
                name,
                email,
                password
            });

            if (data.status === "success") {
                toast.success(data.message);
                window.location.replace('/login')
            }

            return data;
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error);
            }
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({ rejectWithValue }) => {
        try {
            const { data } = await API.get('/user/current-user')
            if (data.status === "success") {
                return data;
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error);
            }
        }
    }
)