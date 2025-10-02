import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const [show, setShow] = useState({
        new_password: false,
        confirm_password: false,
    });

    const toggle = (field) =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            toast.error('Invalid or missing reset token');
            setTokenExpired(true);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTimestamp = Math.floor(Date.now() / 1000);

            if (currentTimestamp > decodedToken.exp) {
                setTokenExpired(true);
                toast.error('Reset link has expired. Please request again.');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            setTokenExpired(true);
            toast.error('Invalid reset link.');
        }
    }, []);

    // submit
    const onSubmit = async (data) => {
        setPasswordError('');

        if (data.new_password !== data.confirm_password) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (tokenExpired) {
            toast.error(
                'Token has expired. Please request a new password reset link.'
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_KEY_URL}/api/user/reset-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        new_password: data.new_password,
                        confirm_password: data.confirm_password,
                        token,
                        email,
                    }),
                }
            );

            const resData = await response.json();

            if (response.ok) {
                toast.success(resData?.message || 'Password reset successful');
                navigate('/login', { replace: true });
            } else {
                toast.error(resData?.message || 'Password reset failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (label, field, placeholder) => (
        <div className="mb-3">
            <label className="mb-2 label-text d-flex gap-1">
                {label} <span className="text-danger">*</span>
            </label>
            <div className="position-relative input-group">
                <input
                    type={show[field] ? 'text' : 'password'}
                    className="form-control py-2 form-input"
                    placeholder={placeholder}
                    {...register(field, { required: true })}
                />
                <span
                    className="input-group-text input-sub-group"
                    onClick={() => toggle(field)}
                    style={{ cursor: 'pointer' }}
                >
                    {show[field] ? (
                        <AiFillEye className="login-icon" />
                    ) : (
                        <AiFillEyeInvisible className="login-icon" />
                    )}
                </span>
            </div>
            {errors[field] && (
                <span className="text-danger error-text">
                    {label} is required
                </span>
            )}
        </div>
    );

    return (
        <div className="login-contanier">
            <div className="container py-5">
                <div className="login-contnet mx-auto">
                    <div className="bg-white p-5 rounded shadow">
                        <h2 className="login-title-logo d-flex align-items-center gap-2 justify-content-center">
                            <span className="login-title-logo">TASK</span>
                        </h2>
                        <p className="login-text">Reset your password</p>

                        {tokenExpired ? (
                            <p className="text-danger text-center">
                                This reset link has expired. Please request a
                                new one.
                            </p>
                        ) : (
                            <form
                                className="mt-5"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {renderInput(
                                    'New Password',
                                    'new_password',
                                    'Enter new password'
                                )}
                                {renderInput(
                                    'Confirm Password',
                                    'confirm_password',
                                    'Re-type new password'
                                )}

                                {passwordError && (
                                    <p className="text-danger error-text">
                                        {passwordError}
                                    </p>
                                )}
                                <input
                                    type="submit"
                                    value={
                                        loading
                                            ? 'Loading...'
                                            : 'Reset Password'
                                    }
                                    className="btn btn-form w-100"
                                    disabled={loading}
                                />
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
