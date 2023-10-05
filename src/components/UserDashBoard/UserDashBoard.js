import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JDoodle from "../Jdoodle";
import "../AdminDashBoard/UserDashBoard.css";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const UserDashBoard = () => {
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
            <div className="dash">
                <div className="sidebar">
                    <div className="left-content">
                        <div className="left-nav-items">
                            <h4 className="link">Courses</h4>
                        </div>
                        {/* Additional content for the left section */}
                    </div>
                </div>

                <div className="right-content">
                    <div className="line-div"></div>
                    <div className="line-div">
                        <p
                            className="course-name"
                            onClick={() => {
                                navigate("/check");
                            }}
                        >
                            Learn R!
                        </p>
                    </div>

                    {/* Additional content for the right section */}
                </div>
            </div>
        </div>
    );
};
export default UserDashBoard;
