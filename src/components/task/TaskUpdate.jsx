import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const TaskUpdate = ({
    show,
    handleClose,
    updateTask,
    getPaginationList,
    allUsers,
}) => {
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
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Title
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            name="title"
                            placeholder="Enter Title"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Due Date
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control px-3 py-2 form-modal-input"
                            name="dueDate"
                        />
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
                        >
                            <option selected>Select Type</option>
                            {allUsers?.map((user) => (
                                <option value={user?.email} key={user?._id}>
                                    {user?.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Descripton
                            <span className="text-danger">*</span>
                        </label>

                        <textarea
                            name="description"
                            id=""
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter Description"
                        ></textarea>
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btns"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default TaskUpdate;
