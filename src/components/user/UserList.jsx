import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import UserUpdate from './UserUpdate';
import { useState } from 'react';
import Image from '../../assets/image/defualtImages.png';
import { DeleteRequest } from '../../api/DeleteRequest';

const UserList = ({ user, slNo, getPaginationList, users }) => {
    const { name } = user;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [modalUpdateUser, setModalUpdateUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(null);

    // update
    const handleUpdateUserClose = () => setModalUpdateUser(false);
    const handleUpdateUserShow = () => setModalUpdateUser(true);

    // delete action
    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    // delete action
    const handleConfirmAction = async () => {
        const api = `${import.meta.env.VITE_API_KEY_URL}/api/user/${
            user?.email
        }`;
        await DeleteRequest(
            api,
            getPaginationList,
            name,
            handleCloseConfirmation
        );
    };
    return (
        <>
            <tr>
                <td className="text-center align-middle table-text">{slNo}</td>
                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center gap-1">
                        <img
                            src={
                                user?.image
                                    ? `${import.meta.env.VITE_API_KEY_URL}/${
                                          user?.image
                                      }`
                                    : Image
                            }
                            alt="user"
                            className="table-user-img"
                        />
                        <span>{user?.name || 'N/A'}</span>
                    </div>
                </td>
                <td className="text-center align-middle table-text">
                    {user?.email || 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {user?.phone || 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {user?.address || 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    <div
                        className={`text-white py-1 px-2 badge ${
                            user?.role === 'Admin' ? 'bg-primary' : 'bg-success'
                        }`}
                    >
                        {user?.role || 'N/A'}
                    </div>
                </td>

                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateUserShow();
                                setUpdateUser(user);
                            }}
                            className="btn btn-sm btn-secondary text-white table-btn fw-semibold d-flex align-items-center gap-1"
                            style={{ fontSize: '12px' }}
                        >
                            <FiEdit />
                            <span>Edit</span>
                        </button>

                        {user?.role !== 'Admin' && (
                            <button
                                type="button"
                                onClick={handleShowConfirmation}
                                className="btn btn-sm btn-danger text-white table-btn fw-semibold d-flex align-items-center gap-1"
                                style={{ fontSize: '12px' }}
                            >
                                <RiDeleteBinLine />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>
                </td>
            </tr>
            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAction}
                name={name || 'N/A'}
            />
            <UserUpdate
                show={modalUpdateUser}
                handleClose={handleUpdateUserClose}
                updateUser={updateUser}
                getPaginationList={getPaginationList}
            />
        </>
    );
};

export default UserList;
