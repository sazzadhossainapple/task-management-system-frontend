import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import { useState } from 'react';
import TaskUpdate from './TaskUpdate';
import Image from '../../assets/image/defualtImages.png';
import moment from 'moment';
import { DeleteRequest } from '../../api/DeleteRequest';
import TaskStatusUpdate from './TaskStatusUpdate';
import { Tooltip } from 'react-tooltip';
import { FaTasks } from 'react-icons/fa';

const TaskList = ({ data, slNo, getPaginationList, users, allUsers }) => {
    const { title } = data;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [modalUpdateTask, setModalUpdateTask] = useState(false);
    const [modalUpateStatusTask, setModalUpateStatusTask] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);
    const [updateStatusTask, setUpdateStatusTask] = useState(null);

    // update status
    const handleUpdateStatusTaskClose = () => setModalUpateStatusTask(false);
    const handleUpdateStatusTaskShow = () => setModalUpateStatusTask(true);

    // update
    const handleUpdateTaskClose = () => setModalUpdateTask(false);
    const handleUpdateTaskShow = () => setModalUpdateTask(true);

    // delete action
    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    // delete action

    const handleConfirmAction = async () => {
        const api = `${import.meta.env.VITE_API_KEY_URL}/api/task/${data?._id}`;
        await DeleteRequest(
            api,
            getPaginationList,
            title,
            handleCloseConfirmation
        );
    };
    return (
        <>
            <tr>
                <td className="text-center align-middle table-text">{slNo}</td>
                <td className=" align-middle table-text">
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={
                                data?.assignedUser?.image
                                    ? `${import.meta.env.VITE_API_KEY_URL}/${
                                          data?.assignedUser?.image
                                      }`
                                    : Image
                            }
                            alt="user"
                            className="table-user-img"
                        />
                        <div>
                            <span className="fw-semibold">
                                {data?.assignedUser?.name || 'N/A'}
                            </span>
                            <br />
                            <span>{data?.assignedUser?.email || 'N/A'}</span>
                        </div>
                    </div>
                </td>
                <td className="text-center align-middle table-text">
                    {data?.title || 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {data?.dueDate
                        ? moment(data?.dueDate).format('DD MMMM YYYY')
                        : 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {data?.description || 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    <div
                        className={`fw-semibold badge text-white ${
                            data?.status === 'Completed'
                                ? 'bg-success'
                                : data?.status === 'Pending'
                                ? 'bg-secondary'
                                : 'bg-warning'
                        }`}
                    >
                        {data?.status || 'N/A'}
                    </div>
                </td>

                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                handleUpdateStatusTaskShow();
                                setUpdateStatusTask(data);
                            }}
                            data-tooltip-id="update-task-tooltip"
                            data-tooltip-content="Update Task Status"
                            className="btn btn-sm btn-primary text-white table-btn fw-semibold d-flex align-items-center gap-1"
                            style={{ fontSize: '12px' }}
                        >
                            <FaTasks />
                        </button>
                        {users?.role === 'Admin' && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleUpdateTaskShow();
                                        setUpdateTask(data);
                                    }}
                                    data-tooltip-id="edit-tooltip"
                                    data-tooltip-content="Update Task"
                                    className="btn btn-sm btn-secondary text-white table-btn fw-semibold d-flex align-items-center gap-1"
                                    style={{ fontSize: '12px' }}
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleShowConfirmation}
                                    data-tooltip-id="delete-tooltip"
                                    data-tooltip-content="Delete Task"
                                    className="btn btn-sm btn-danger text-white table-btn fw-semibold d-flex align-items-center gap-1"
                                    style={{ fontSize: '12px' }}
                                >
                                    <RiDeleteBinLine />
                                </button>
                            </>
                        )}
                    </div>
                    <Tooltip id="edit-tooltip" />
                    <Tooltip id="delete-tooltip" />
                    <Tooltip id="update-task-tooltip" />
                </td>
            </tr>
            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAction}
                name={title || 'N/A'}
            />
            <TaskUpdate
                show={modalUpdateTask}
                handleClose={handleUpdateTaskClose}
                updateTask={updateTask}
                getPaginationList={getPaginationList}
                allUsers={allUsers}
            />
            <TaskStatusUpdate
                show={modalUpateStatusTask}
                handleClose={handleUpdateStatusTaskClose}
                updateStatusTask={updateStatusTask}
                getPaginationList={getPaginationList}
            />
        </>
    );
};

export default TaskList;
