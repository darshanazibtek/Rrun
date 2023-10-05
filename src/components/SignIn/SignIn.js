import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Reducers/AuthReducer";
import { useSelector, useDispatch } from "react-redux";
import "./SignIn.css";

const schema = Yup.object().shape({
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
});

const SignIn = () => {
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
                className="signin-form"
            >
                <div className="signin-group">
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

                <div className="signin-group">
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

                <div className="btn-signup">
                    <button type="submit" className="button-one">
                        Signin
                    </button>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        className="button-signup"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
