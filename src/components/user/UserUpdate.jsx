import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateRequest } from '../../api/UpdateRequest';
const UserUpdate = ({ show, handleClose, updateUser, getPaginationList }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();

        formData.append('name', data.name.trim());
        formData.append('email', updateUser.email);
        formData.append('password', updateUser.password);
        formData.append('phone', data.phone.trim());
        formData.append('address', data.address.trim());
        formData.append('role', data.role.trim());

        if (data?.image && data?.image[0]) {
            formData.append('file', data.image[0]);
        }

        const api = `${import.meta.env.VITE_API_KEY_URL}/api/user/${
            updateUser?.email
        }`;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${localStorage.getItem('taskToken')}`,
            },
        };

        await UpdateRequest(
            formData,
            config,
            api,
            setLoading,
            reset,
            handleClose,
            getPaginationList
        );
    };

    useEffect(() => {
        if (updateUser) {
            setValue('name', updateUser?.name || '');
            setValue('phone', updateUser?.phone || '');
            setValue('address', updateUser?.address || '');
            setValue('role', updateUser?.role || '');
        }
    }, [updateUser, setValue]);

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
                    Update User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Name
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter name"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <span className="text-danger error-text">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter phone"
                            {...register('phone')}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            placeholder="Enter address"
                            {...register('address')}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            User Type
                            <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            placeholder="Select Type"
                            {...register('role', {
                                required: true,
                            })}
                        >
                            <option value="User" selected>
                                User
                            </option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.role && (
                            <span className="text-danger error-text">
                                Role is required
                            </span>
                        )}
                    </div>
                    <div className="col-12">
                        <label className="mb-2 label-text d-flex gap-1 ">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('image')}
                        />
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            disabled={loading}
                            value={loading ? 'Adding...' : 'Add User'}
                            className="btn btns"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserUpdate;
