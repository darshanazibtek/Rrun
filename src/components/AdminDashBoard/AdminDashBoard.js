import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JDoodle from "../Jdoodle";
import "./UserDashBoard.css";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InivationModal from "./InivationModal";
import { useState } from "react";
import courseList from "../../DummyData/CourseList.json";

const AdminDashBoard = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setOpenModal(false);
    };

    const openHandler = () => {
        setOpenModal(true);
    };

    return (
        <div>
            {openModal && <InivationModal closeModal={closeModal} />}
            <div className="dash">
                <div className="sidebar">
                    <div className="left-content">
                        <div className="left-nav-items">
                            <h4 className="link">Courses</h4>
                            <h4 className="link">Learners</h4>
                        </div>
                        {/* Additional content for the left section */}
                    </div>
                </div>

                <div className="right-content">
                    <button
                        className="create-btn"
                        onClick={() => {
                            navigate("/addCourse");
                        }}
                    >
                        Create Course
                    </button>
                    <div className="line-div"></div>
                    <div className="courses-div">
                        {courseList?.map(courseList => {
                            return (
                                <div className="course-content">
                                    <Link
                                        to={`/${courseList.courseId}/configureCourse`}
                                        className="links"
                                    >
                                        <p className="course-name">
                                            {courseList.name}
                                        </p>
                                    </Link>

                                    <FontAwesomeIcon
                                        icon={faArrowUpFromBracket}
                                        className="share-icon"
                                        onClick={openHandler}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional content for the right section */}
                </div>
            </div>
        </div>
    );
};
export default AdminDashBoard;
