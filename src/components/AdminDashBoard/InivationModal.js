import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./InivationModal.css";

const schema = Yup.object().shape({
    studentEmail: Yup.string()
        .required("Please enter  Email")
        .email("Invalid email address"),
});

const InivationModal = ({ closeModal }) => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = data => {
        console.log(data);
    };

    return (
        <div>
            <div className="backdrop" onClick={closeModal} />
            <form
                className="invite-form"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <div className="form-group-one">
                    <div className="text-one">
                        <label htmlFor="first-name" className="label-txt-one">
                            Enter email you want to invite
                        </label>
                    </div>

                    <input
                        className="input-one"
                        type="email"
                        id="studentEmail"
                        name="studentEmail"
                        {...register("studentEmail", { required: true })}
                    />
                    <div className="error-div">
                        {errors.email && (
                            <p className="one-error">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="btn-invt">
                    <button type="submit" className="button-one">
                        Invite Users
                    </button>
                </div>
            </form>
        </div>
    );
};
export default InivationModal;
