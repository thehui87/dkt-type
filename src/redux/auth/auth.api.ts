import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../utils/api';

interface LoginData {
    login: string;
    password: string;
}

export const loginUsers = createAsyncThunk(
    'auth/login',
    async (dataObj: LoginData, { rejectWithValue }) => {
        try {
            const { data } = await postApi(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                dataObj,
                { withCredentials: true }
            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (dataObj: LoginData, { rejectWithValue }) => {
        try {
            const { data } = await postApi(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                dataObj,
                { withCredentials: true }
            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refresh-token',
    async () => {
        try {
            const { data } = await postApi(
                `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
                {},
                { withCredentials: true }
            );

            console.log('dataaa:', data);
            // const data = await response.json();
            if (data?.accessToken) {
                console.log('New Access Token:', data.accessToken);
                return data;
            } else {
                console.log('Failed to refresh token');
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    try {
        await postApi(
            `${process.env.REACT_APP_API_URL}/auth/logout`,
            {},
            {
                withCredentials: true, // Ensure cookies are included in the request
            }
        );

        // After successful logout, redirect or clear the client-side state
        console.log('Logged out successfully');
        // Redirect to login or home page
    } catch (error) {
        console.error('Error logging out:', error);
    }
});

export default {
    loginUsers,
    refreshAccessToken,
    logoutUser,
    registerUser,
};
