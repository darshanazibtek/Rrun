import { configureStore } from "@reduxjs/toolkit";
import CourseReducer from "../Reducers/CourseReducer";
import AuthReducer from "../Reducers/AuthReducer";
import FetchCourseReducer from "../Reducers/FetchCourse";

export const Store = configureStore({
    reducer: {
        course: CourseReducer,
        auth: AuthReducer,
        fetchCourse: FetchCourseReducer,
    },
});
