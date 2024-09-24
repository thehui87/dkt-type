import { createSlice } from '@reduxjs/toolkit'; //PayloadAction
import AUTH_API from './auth.api';

interface AuthenticationState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    // status: string;
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    userLoggedIn: boolean;
}
// Initial state
const initialState: AuthenticationState = {
    status: 'idle',
    loading: false,
    error: null,
    accessToken: null,
    userLoggedIn: false,
};

// Create slice
const authenticationSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        resetAll: (state) => {
            console.log('auth slice: reset all');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AUTH_API.loginUser.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
            state.userLoggedIn = false;
        });
        builder.addCase(AUTH_API.loginUser.fulfilled, (state, action: any) => {
            state.status = 'succeeded';
            state.loading = false;
            state.error = null;
            state.accessToken = action?.payload?.accessToken;
            if (state.accessToken != null) state.userLoggedIn = true;
        });
        builder.addCase(AUTH_API.loginUser.rejected, (state, action: any) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
            state.accessToken = null;
            state.userLoggedIn = false;
        });

        builder.addCase(AUTH_API.refreshAccessToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            AUTH_API.refreshAccessToken.fulfilled,
            (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.accessToken = action?.payload?.accessToken;
                if (state.accessToken != null) state.userLoggedIn = true;
            }
        );
        builder.addCase(
            AUTH_API.refreshAccessToken.rejected,
            (state, action: any) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
                state.accessToken = null;
                state.userLoggedIn = false;
            }
        );

        builder.addCase(AUTH_API.logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(AUTH_API.logoutUser.fulfilled, (state, action: any) => {
            state.loading = false;
            state.error = null;
            state.accessToken = null;
            state.userLoggedIn = false;
        });
        builder.addCase(AUTH_API.logoutUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });

        builder.addCase(AUTH_API.registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            AUTH_API.registerUser.fulfilled,
            (state, action: any) => {
                state.loading = false;
                state.error = null;
            }
        );
        builder.addCase(
            AUTH_API.registerUser.rejected,
            (state, action: any) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            }
        );

        builder.addCase(AUTH_API.forgotPaswordURL.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            AUTH_API.forgotPaswordURL.fulfilled,
            (state, action: any) => {
                state.loading = false;
                state.error = null;
            }
        );
        builder.addCase(
            AUTH_API.forgotPaswordURL.rejected,
            (state, action: any) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            }
        );
        builder.addCase(AUTH_API.resetPasswordURL.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            AUTH_API.resetPasswordURL.fulfilled,
            (state, action: any) => {
                state.loading = false;
                state.error = null;
            }
        );
        builder.addCase(
            AUTH_API.resetPasswordURL.rejected,
            (state, action: any) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            }
        );
    },
});

// Export actions
export const { resetAll } = authenticationSlice.actions;

// Export reducer
export default authenticationSlice.reducer;
