import "./AddLesson.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Editor } from "@monaco-editor/react";

const schema = Yup.object().shape({
    AssignmentTitle: Yup.string("AssignmentTitle must be String")
        .required("AssignmentTitle is required")
        .max(50, "AssignmentTitle must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid AssignmentTitle"
        )
        .min(2, "AssignmentTitle must be at least 2 characters"),
    AssignmentDetails: Yup.string("AssignmentDetails must be String")
        .required("AssignmentDetails is required")
        .max(50, "AssignmentDetails must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid AssignmentDetails"
        )
        .min(2, "AssignmentDetails must be at least 2 characters"),
    Hints: Yup.string("Hints must be String")
        .required("Hints is required")
        .max(50, "Hints must be at most 50 characters")
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid Hints")
        .min(2, "Hints must be at least 2 characters"),
    TestCases: Yup.string()
        .required("TestCases is required")
        .max(50, "TestCases must be at most 50 characters")
        .min(2, "TestCases must be at least 2 characters"),
});

const AddLesson = () => {
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = data => {
        console.log("details", data);
    };

    return (
        <div>
            <div className="add-lesson">
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="add-lesson-form"
                >
                    <div className="flex-combine">
                        <div className="form-group-lesson-one">
                            <div className="text-one">
                                <label
                                    htmlFor="first-name"
                                    className="label-txt-one"
                                >
                                    Title Assignment
                                </label>
                            </div>

                            <input
                                className="input-lesson-title"
                                type="text"
                                id="AssignmentTitle"
                                name="AssignmentTitle"
                                autoComplete="AssignmentTitle"
                                {...register("AssignmentTitle", {
                                    required: true,
                                })}
                            />
                            <div className="error-div">
                                {errors.AssignmentTitle && (
                                    <p className="one-error">
                                        {errors.AssignmentTitle.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>Add Video +</div>
                    </div>

                    <div className="form-group-lesson">
                        <div className="text-one">
                            <label
                                htmlFor="first-name"
                                className="label-txt-one"
                            >
                                Assignment Details
                            </label>
                        </div>

                        <textarea
                            type="text"
                            id="AssignmentDetails"
                            name="AssignmentDetails"
                            autoComplete="AssignmentDetails"
                            {...register("AssignmentDetails", {
                                required: true,
                            })}
                        />
                        <div className="error-div">
                            {errors.AssignmentDetails && (
                                <p className="one-error">
                                    {errors.AssignmentDetails.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-group-lesson">
                        <div className="text-one">
                            <label
                                htmlFor="test-cases"
                                className="label-txt-one"
                            >
                                Test Cases
                            </label>
                        </div>

                        <Controller
                            control={control}
                            name="TestCases"
                            render={({ field }) => (
                                <Editor
                                    id="test-cases"
                                    height="100px"
                                    language="r"
                                    theme="vs-dark"
                                    onChange={field.onChange}
                                    value={field.value}
                                />
                            )}
                        />

                        <div className="error-div">
                            {errors.TestCases && (
                                <p className="one-error">
                                    {errors.TestCases.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-group-lesson">
                        <div className="text-one">
                            <label
                                htmlFor="first-name"
                                className="label-txt-one"
                            >
                                Hints
                            </label>
                        </div>

                        <textarea
                            type="text"
                            id="Hints"
                            name="Hints"
                            autoComplete="Hints"
                            {...register("Hints", {
                                required: true,
                            })}
                        />
                        <div className="error-div">
                            {errors.Hints && (
                                <p className="one-error">
                                    {errors.Hints.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="btn-addCourse">
                        <button type="submit" className="button-addCourse">
                            continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddLesson;
