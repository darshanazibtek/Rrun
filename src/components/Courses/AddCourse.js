import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./AddCourse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
    courseTitle: Yup.string("Course title must be String")
        .required("Course title is required")
        .max(50, "Course title must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid Course title"
        )
        .min(2, "Course title must be at least 2 characters"),
    courseDescription: Yup.string("Course description must be String")
        .required("Course description is required")
        .max(50, "Course description must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid Course description"
        )
        .min(2, "Course description must be at least 2 characters"),
    videoFile: Yup.mixed().required("Video file is required"),
});

const AddCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = ({ courseTitle, courseDescription, videoFile }) => {
        console.log(videoFile);

        //navigate("/configureCourse");
    };

    return (
        <div>
            <div
                className="back-icon"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
            </div>

            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="addCourse-form"
            >
                <div className="form-group-one">
                    <div className="text">
                        <label htmlFor="courseTitle" className="label-txt-two">
                            Course Title
                        </label>
                    </div>
                    <input
                        className="input-course"
                        type="text"
                        id="courseTitle"
                        name="courseTitle"
                        {...register("courseTitle", { required: true })}
                    />
                    <div className="error-div">
                        {errors.courseTitle && (
                            <p className="one-error">
                                {errors.courseTitle.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="form-group-one">
                    <div className="text">
                        <label
                            htmlFor="courseDescription"
                            className="label-txt-two"
                        >
                            Course Description
                        </label>
                    </div>
                    <text
                        // rows="10"
                        // cols="40"
                        className="input-textArea"
                        type="courseDescription"
                        id="courseDescription"
                        name="courseDescription"
                        {...register("courseDescription", { required: true })}
                    />
                    <div className="error-div">
                        {errors.courseDescription && (
                            <p className="one-error">
                                {errors.courseDescription.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="form-group-one">
                    <div className="text">
                        <label htmlFor="videoFile" className="label-txt-two">
                            Upload Video
                        </label>
                    </div>
                    <input
                        type="file"
                        id="videoFile"
                        name="videoFile"
                        accept="video"
                        {...register("videoFile", { required: true })}
                    />
                    <div className="error-div">
                        {errors.videoFile && (
                            <p className="one-error">
                                {errors.videoFile.message}
                            </p>
                        )}
                        {console.log("veror", errors)}
                    </div>
                </div>

                <div className="btn-addCourse">
                    <button type="submit" className="button-addCourse">
                        continue
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddCourse;
