// fetchAndPostCourseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourse = createAsyncThunk(
    "courseDetails/fetchCourse",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("api/courses");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const postCourse = createAsyncThunk(
    "courseDetails/postCourse",
    async (courseData, { rejectWithValue }) => {
        try {
            const response = await axios.post("api/courses", courseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    courses: [],
    loading: false,
    error: null,
};

const fetchAndPostCourseSlice = createSlice({
    name: "fetchAndPostCourseDetails",
    initialState,
    reducers: {
        // ... other reducers
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCourse.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postCourse.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postCourse.fulfilled, (state, action) => {
                state.loading = false;
                // Handle the response if needed
            })
            .addCase(postCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default fetchAndPostCourseSlice.reducer;
