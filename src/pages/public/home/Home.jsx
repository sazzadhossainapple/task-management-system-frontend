import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const Home = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const user = {
            email: data.email.trim(),
            password: data.password.trim(),
        };

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                const jwtToken = data?.data?.token;
                if (jwtToken) {
                    localStorage.setItem('taskToken', jwtToken);
                    setToken(jwtToken);
                    toast.success('Login Successfully!');
                    reset();
                    navigate(from, { replace: true });
                } else {
                    toast.error(data?.message);
                    console.log(data?.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="login-contanier">
            <div className="container py-5">
                <div className="login-contnet mx-auto">
                    <div className="bg-white p-5 rounded shadow">
                        <h2 className="login-title-logo d-flex align-items-center gap-2 justify-content-center">
                            <span className="login-title-logo">TASK</span>
                        </h2>
                        <p className="login-text">Login into your account</p>
                        <form
                            className="mt-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label login-label"
                                >
                                    Email <span className="text-danger">*</span>
                                </label>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control py-2 form-input"
                                        id="exampleInputPassword1"
                                        placeholder="Enter email"
                                        name="email"
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
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label login-label"
                                >
                                    Password{' '}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="position-relative input-group">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="form-control py-2 form-input"
                                        name="password"
                                        id="exampleInputPassword1"
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter password"
                                        onChange={(e) =>
                                            setUserPass(e.target.value)
                                        }
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />

                                    <span className="input-group-text input-sub-group">
                                        {showPassword ? (
                                            <>
                                                <AiFillEye
                                                    onClick={togglePassword}
                                                    className="login-icon"
                                                ></AiFillEye>
                                            </>
                                        ) : (
                                            <>
                                                <AiFillEyeInvisible
                                                    onClick={(e) =>
                                                        setShowPassword(e)
                                                    }
                                                    className="login-icon"
                                                ></AiFillEyeInvisible>
                                            </>
                                        )}
                                    </span>
                                </div>
                                {errors.password && (
                                    <span className="text-danger error-text">
                                        Password is required
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 text-end">
                                <Link
                                    to="/forgot-password"
                                    className="forget-link"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <input
                                type="submit"
                                className="btn btn-form  w-100"
                                value={`${loading ? 'Loading...' : 'Login'}`}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
