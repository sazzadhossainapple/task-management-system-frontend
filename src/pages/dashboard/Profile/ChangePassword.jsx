import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggle = (field) =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const onSubmit = async (data) => {
        setPasswordError('');
        if (data.new_password !== data.confirm_password) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }

        setLoading(true);
        try {
            const token = `Bearer ${localStorage.getItem('taskToken')}`;
            const res = await fetch(
                `${import.meta.env.VITE_API_KEY_URL}/api/user/update-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await res.json();

            if (
                result.success === true &&
                result.data === 'Password Updated Successfully!!'
            ) {
                toast.success(result.data || 'Password updated successfully');
                reset();
                localStorage.removeItem('taskToken');
                navigate('/');
            } else {
                toast.error(result.data || 'Something went wrong');
            }
        } catch (err) {
            toast.error(err.message);
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
        <div className="home-content">
            <div className="mb-5">
                <h3 className="dashboard-title text-center">Manage Password</h3>
                <div className="bg-white rounded profile-container shadow">
                    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                        {renderInput(
                            'Current Password',
                            'current_password',
                            'Enter current password'
                        )}
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

                        <div className="mt-4 mb-3 d-flex justify-content-center">
                            <input
                                type="submit"
                                className="btn btn-modal text-center w-100"
                                value={
                                    loading ? 'Changing...' : 'Change Password'
                                }
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
