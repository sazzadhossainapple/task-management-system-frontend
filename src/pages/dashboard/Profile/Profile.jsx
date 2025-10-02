import { useState } from 'react';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import Loading from '../../../components/loading/Loading';
import { FiEdit } from 'react-icons/fi';
import image from '../../../assets/image/defualtImages.png';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
    const [users, isLoading, fetchUser] = useLoggedInUser();
    const [userUpdate, setUserUpdate] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loading />
            </div>
        );
    }
    return (
        <div className="home-content">
            <div className="bg-white rounded profile-container shadow">
                <div className="p-5">
                    <div>
                        <div
                            className="mx-auto"
                            style={{ width: '140px', height: ' 140px' }}
                        >
                            <img
                                src={
                                    users?.image
                                        ? `${
                                              import.meta.env.VITE_API_KEY_URL
                                          }/${users?.image}`
                                        : image
                                }
                                className="rounded-circle object-fit-cover object-position-top"
                                width="100%"
                                height="100%"
                                alt={users?.name || 'N/A'}
                            />
                        </div>

                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button
                                onClick={() => {
                                    handleShow();
                                    setUserUpdate(users);
                                }}
                                className="btn btns d-flex align-items-center gap-1"
                            >
                                <FiEdit className="add-icon" />{' '}
                                <span>Edit Profile</span>
                            </button>
                        </div>
                        <hr />

                        <table className="table table-hover mb-0">
                            <tbody>
                                <tr>
                                    <th scope="row" className="profile-text">
                                        Name:
                                    </th>
                                    <td className="profile-text">
                                        {users?.name || 'N/A'}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="profile-text">
                                        Email:
                                    </th>
                                    <td className="profile-text">
                                        {users?.email || 'N/A'}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" className="profile-text">
                                        Phone:
                                    </th>
                                    <td className="profile-text">
                                        {users?.phone || 'N/A'}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="profile-text">
                                        Role:
                                    </th>
                                    <td>
                                        <span className="badge badge-info text-capitalize">
                                            {users?.role || 'N/A'}
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" className="profile-text">
                                        Address:
                                    </th>
                                    <td className="profile-text">
                                        {users?.address || 'N/A'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <UpdateProfile
                show={show}
                handleClose={handleClose}
                userUpdate={userUpdate}
                fetchUser={fetchUser}
            />
        </div>
    );
};

export default Profile;
