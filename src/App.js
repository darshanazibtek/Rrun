import {
    BrowserRouter,
    Route,
    Routes,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { useState } from "react";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import JDoodle from "./components/Jdoodle";
import Meditor from "./components/Meditor";
import RComponent from "./components/RCompiler";
import RCompiler from "./components/RCompiler";
import Jupyter from "./components/Jupyter";
import AceEdit from "./components/AceEdit";
import Light from "./components/Light";
import MonacoEditorComponent from "./components/MonacoEditorComponent";
import Webr from "./components/Webr";
import PlotCheck from "./components/PlotCheck";
import WebrGraph from "./components/WebrGraph";
import WebrTest from "./components/WebrTest";
import AddCourse from "./components/Courses/AddCourse";
import ConfigureCourse from "./components/Courses/ConfigureCourse";
import AddLesson from "./components/Courses/Lesson/AddLesson";
import Quiz from "./components/Quiz";
import UserDashBoard from "./components/UserDashBoard/UserDashBoard";
import UserCoursePage from "./components/UserDashBoard/UserCourses/UserCoursePage";
import CodingEnv from "./components/UserDashBoard/UserCourses/CodingEnv";
import MultipleChoiceEnv from "./components/UserDashBoard/UserCourses/MultipleChoiceEnv";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/course" element={<AdminDashBoard />} />
                <Route path="/Usercourse" element={<UserDashBoard />} />
                <Route path="/check" element={<WebrTest />} />
                <Route path="/addCourse" element={<AddCourse />} />
                <Route
                    path="/:courseId/configureCourse"
                    element={<ConfigureCourse />}
                />
                <Route path="/:courseId/Addlesson" element={<AddLesson />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route
                    path="/userCoursePage/:courseId"
                    element={<UserCoursePage />}
                />
                <Route path="/codingEnv" element={<CodingEnv />} />
                <Route path="/multipleChoice" element={<MultipleChoiceEnv />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
