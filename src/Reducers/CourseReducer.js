import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk(
    "courseDetails/createCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("api/courses", data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCourse = createAsyncThunk(
    "courseDetails/createCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get("api/courses");

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addLessons = createAsyncThunk(
    "courseDetails/courseid/addLessons",
    async (data, { rejectWithValue }) => {
        try {
            const { courseId, lessons } = data;
            const response = await axios.post(
                `api/courses/${courseId}/lessons`,
                lessons
            );

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

export const courseSlice = createSlice({
    name: "courseDetails",
    initialState,
    reducers: {
        // ... other reducers
    },
    extraReducers: builder => {
        builder
            .addCase(createCourse.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addLessons.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLessons.fulfilled, (state, action) => {
                state.loading = false;
                // Find the course by courseId
                const course = state.courses.find(
                    course => course.courseId === action.payload.courseId
                );
                if (course) {
                    // Add the lessons to the found course
                    course.lessons.push(...action.payload.lessons);
                }
            })
            .addCase(addLessons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default courseSlice.reducer;
