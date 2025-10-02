import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import UserUpdate from './UserUpdate';
import { useState } from 'react';

const UserList = () => {
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
    const handleConfirmAction = () => {};
    return (
        <>
            <tr>
                <td className="text-center align-middle table-text">1</td>
                <td className="text-center align-middle table-text">
                    Sazzad Hossain
                </td>
                <td className="text-center align-middle table-text">
                    New Task
                </td>
                <td className="text-center align-middle table-text">
                    {' '}
                    10-10-2022
                </td>
                <td className="text-center align-middle table-text">datoeo</td>
                <td className="text-center align-middle table-text">Pending</td>

                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-info text-white table-btn fw-semibold d-flex align-items-center gap-1"
                            style={{ fontSize: '12px' }}
                        >
                            <AiOutlineEye />
                            <span>View</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateUserShow();
                                setUpdateUser(null);
                            }}
                            className="btn btn-sm btn-secondary text-white table-btn fw-semibold d-flex align-items-center gap-1"
                            style={{ fontSize: '12px' }}
                        >
                            <FiEdit />
                            <span>Edit</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleShowConfirmation}
                            className="btn btn-sm btn-danger text-white table-btn fw-semibold d-flex align-items-center gap-1"
                            style={{ fontSize: '12px' }}
                        >
                            <RiDeleteBinLine />
                            <span>Delete</span>
                        </button>
                    </div>
                </td>
            </tr>
            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAction}
                name=""
            />
            <UserUpdate
                show={modalUpdateUser}
                handleClose={handleUpdateUserClose}
                updateUser={updateUser}
            />
        </>
    );
};

export default UserList;
