import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PostRequest } from '../../../api/PostRequest';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        const saveData = {
            email: data.email.trim(),
        };

        const api = `${
            import.meta.env.VITE_API_KEY_URL
        }/api/user/forget-password`;

        await PostRequest(saveData, api, setLoading, reset);
    };

    return (
        <div className="login-contanier">
            <div className="container py-5">
                <div className="login-contnet mx-auto">
                    <div className="bg-white p-5 rounded shadow">
                        <h2 className="login-title-logo d-flex align-items-center gap-2 justify-content-center">
                            <span className="login-title-logo">TASK</span>
                        </h2>
                        <p className="login-text">
                            Enter your email to reset the password
                        </p>

                        <form
                            className="mt-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-3">
                                <label className="form-label login-label">
                                    Email <span className="text-danger">*</span>
                                </label>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control py-2 form-input"
                                        placeholder="Enter email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                    <span className="input-group-text input-sub-group">
                                        <MdOutlineEmail className="login-icon" />
                                    </span>
                                </div>
                                {errors.email && (
                                    <span className="text-danger error-text">
                                        Email is required
                                    </span>
                                )}
                            </div>

                            <div className="mb-3 text-end">
                                <Link to="/" className="forget-link">
                                    Back to login?
                                </Link>
                            </div>

                            <input
                                type="submit"
                                value={loading ? 'Loading...' : 'Submit'}
                                className="btn btn-form w-100"
                                disabled={loading}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
