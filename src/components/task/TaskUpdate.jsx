import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateRequest } from '../../api/UpdateRequest';

const TaskUpdate = ({
    show,
    handleClose,
    updateTask,
    getPaginationList,
    allUsers,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);

        const apiData = {
            title: data.title.trim(),
            description: data.description.trim(),
            assignedUser: data.assignedUser.trim(),
            dueDate: data.dueDate.trim(),
        };

        const api = `${import.meta.env.VITE_API_KEY_URL}/api/task/${
            updateTask?._id
        }`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('taskToken')}`,
            },
        };

        await UpdateRequest(
            apiData,
            config,
            api,
            setLoading,
            reset,
            handleClose,
            getPaginationList
        );
    };

    useEffect(() => {
        if (updateTask) {
            reset({
                title: updateTask.title || '',
                description: updateTask.description || '',
                assignedUser: updateTask.assignedUser?._id || '',
                dueDate: updateTask.dueDate
                    ? new Date(updateTask.dueDate).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [updateTask, reset]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            scrollable={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="modal-title ps-2"
                    id="contained-modal-title-vcenter"
                >
                    Update Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Title
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter Title"
                            {...register('title', { required: true })}
                        />
                        {errors.title && (
                            <span className="text-danger">
                                Title is required
                            </span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Due Date
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('dueDate', { required: true })}
                        />
                        {errors.dueDate && (
                            <span className="text-danger">
                                Due Date is required
                            </span>
                        )}
                    </div>
                    <div className="col-12">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            User
                            <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            name="assignedUser"
                            placeholder="Select Type"
                            {...register('assignedUser', { required: true })}
                        >
                            <option selected>Select User</option>
                            {allUsers?.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.assignedUser && (
                            <span className="text-danger">
                                User is required
                            </span>
                        )}
                    </div>

                    <div className="col-12">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Descripton
                        </label>

                        <textarea
                            name="description"
                            id=""
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter Description"
                            {...register('description')}
                        ></textarea>
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            disabled={loading}
                            value={loading ? 'Updating...' : 'Update Task'}
                            className="btn btns"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskUpdate;
