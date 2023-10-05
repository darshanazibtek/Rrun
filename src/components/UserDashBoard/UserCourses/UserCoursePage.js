import courseData from "../../../DummyData/data.json";
import "./UserCoursePage.css";
import { useParams } from "react-router-dom";
import { fetchCourse } from "../../../Reducers/CourseReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const UserCoursePage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { course, error, loading } = useSelector(state => state.course);

    console.log("params", params);

    useEffect(() => {
        dispatch(fetchCourse());
    }, []);

    return (
        <div className="user-crs-page">
            <video width="550" height="400" controls>
                <source src="https://youtu.be/_PyrtxTW8yM" />
            </video>
            <div className="course-description">
                <h3>Course Description</h3>
                <p>{courseData.instructions}</p>
            </div>
            <div className="btn-ctn">
                <button type="submit" className="button-ctn">
                    continue
                </button>
            </div>
        </div>
    );
};
export default UserCoursePage;
