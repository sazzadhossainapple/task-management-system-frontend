import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
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
                        <form className="mt-5">
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
                                    />
                                    <span className="input-group-text input-sub-group">
                                        <MdOutlineEmail className="login-icon" />
                                    </span>
                                </div>
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
                            </div>
                            <div className="mb-3 text-end">
                                <Link
                                    to="/forgot-password"
                                    className="forget-link"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-form  w-100"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
