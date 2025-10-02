import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
const UserAdd = ({ show, handleClose }) => {
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
                    Add User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Name
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            name="name"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Email
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control px-3 py-2 form-modal-input"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            name="phone"
                            placeholder="Enter phone"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            name="address"
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control px-3 py-2 form-modal-input"
                            name="file"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            User Type
                            <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            name="assignedUser"
                            placeholder="Select Type"
                        >
                            <option selected disabled>
                                Select Type
                            </option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
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

export default UserAdd;
