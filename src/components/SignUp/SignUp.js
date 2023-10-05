import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Reducers/AuthReducer";
import { useSelector, useDispatch } from "react-redux";

import "./SignUp.css";

const schema = Yup.object().shape({
    firstName: Yup.string("First name must be String")
        .required("First name is required")
        .max(50, "First name must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid first name"
        )
        .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
        .required("Last name is required")

        .max(50, "Last name must be at most 50 characters")
        .matches(
            /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            "Invalid first name"
        ),
    email: Yup.string()
        .required("Please enter  Email")
        .email("Invalid email address"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        ),
    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
    const { user, loading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const [formOneData, setData] = useState({});
    const [submitted, SetSubmitted] = useState(false);

    function onSubmitHandler(data) {
        // onPersonDetailSubmit(data);
        // navigate("/singleFamilyPropertyDetails");
        //console.log(data);

        dispatch(registerUser({ data }));
        if (error) {
            alert(error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="signup-form"
            >
                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="first-name" className="label-txt-one">
                            First Name
                        </label>
                    </div>

                    <input
                        className="input-one"
                        type="text"
                        id="first-name"
                        name="firstName"
                        autoComplete="firstName"
                        {...register("firstName", { required: true })}
                    />
                    <div className="error-div">
                        {errors.firstName && (
                            <p className="one-error">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="lastName" className="label-txt-one">
                            Last Name
                        </label>
                    </div>
                    <input
                        className="input-one"
                        type="text"
                        id="last-name"
                        name="lastName"
                        autoComplete="lastName"
                        {...register("lastName", { required: true })}
                    />
                    <div className="error-div">
                        {errors.lastName && (
                            <p className="one-error">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="email" className="label-txt-one">
                            Email
                        </label>
                    </div>
                    <input
                        className="input-one"
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        {...register("email", { required: true })}
                    />
                    <div className="error-div">
                        {errors.email && (
                            <p className="one-error">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="password" className="label-txt-one">
                            Password
                        </label>
                    </div>
                    <input
                        className="input-one"
                        type="password"
                        id="password"
                        name="password"
                        {...register("password", { required: true })}
                        autoComplete="new-password"
                    />
                    <div className="error-div">
                        {errors.password && (
                            <p className="one-error">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="password" className="label-txt-one">
                            Confirm Password
                        </label>
                    </div>
                    <input
                        className="input-one"
                        type="confirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        {...register("confirmPassword", { required: true })}
                        autoComplete="new-password"
                    />
                    <div className="error-div">
                        {errors.confirmPassword && (
                            <p className="one-error">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="btn-one">
                    <button type="submit" className="button-one">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
