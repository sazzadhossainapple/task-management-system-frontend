import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateRequest } from '../../api/UpdateRequest';

const TaskStatusUpdate = ({
    show,
    handleClose,
    updateStatusTask,
    getPaginationList,
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
            status: data?.status,
        };

        const api = `${import.meta.env.VITE_API_KEY_URL}/api/task/${
            updateStatusTask?._id
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
        if (updateStatusTask) {
            reset({
                status: updateStatusTask.status || '',
            });
        }
    }, [updateStatusTask, reset]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            scrollable={true}
            // size="lg"
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
                    <div className="col-12">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Task Status
                            <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            placeholder="Select Type"
                            {...register('status', { required: true })}
                        >
                            <option value="" disabled>
                                Select User
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {errors.status && (
                            <span className="text-danger">
                                Task Status is required
                            </span>
                        )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            disabled={loading}
                            value={loading ? 'Updating...' : 'Update Status'}
                            className="btn btns"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskStatusUpdate;
