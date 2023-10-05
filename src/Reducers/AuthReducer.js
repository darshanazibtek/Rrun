import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register

export const registerUser = createAsyncThunk("/", async data => {
    try {
        console.log("redux", data);
        const response = await axios.post(
            "http://localhost:3001/auth/register",
            data
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
});

export const login = createAsyncThunk("auth/login", async data => {
    try {
        const response = await axios.post(
            "http://localhost:3001/auth/login",
            data
        );
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
    } catch (error) {
        throw new Error(error.message);
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
