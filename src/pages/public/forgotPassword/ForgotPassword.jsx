import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="login-contanier">
            <div className="container py-5">
                <div className="login-contnet mx-auto">
                    <div className="bg-white p-5 rounded shadow">
                        <h2 className="login-title-logo d-flex align-items-center gap-2 justify-content-center">
                            <span className="login-title-logo">TASK</span>
                        </h2>
                        <p className="login-text">
                            {' '}
                            Enter your email to reset the password
                        </p>
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

                            <div className="mb-3 text-end">
                                <Link to="/" className="forget-link">
                                    Back to login?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-form  w-100"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
