import { useDispatch, useSelector } from "react-redux";
import "./Configurecourse.css";
import { Dispatch } from "@reduxjs/toolkit";
import { addlessons } from "../../Reducers/CourseReducer";
import { useNavigate, useParams } from "react-router-dom";
import courseList from "../../DummyData/CourseList.json";

const ConfigureCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // const courseDetails = useSelector(
    //     state => state.course.course[0].courseTitle
    // );
    const addLes = () => {
        navigate("/addLesson");
    };

    const selectedCourse = courseList.filter(
        course => course.courseId === params.courseId
    );

    console.log("selectedCourse", selectedCourse);

    console.log(selectedCourse.courseId);
    return (
        <div>
            <div className="configure-course">
                <div>Configure {selectedCourse[0].name}</div>
                <div onClick={addLes}> Add lesson+</div>
            </div>

            <div className="top"></div>
            <div className="bottom"></div>
        </div>
    );
};
export default ConfigureCourse;
