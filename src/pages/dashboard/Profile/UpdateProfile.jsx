import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import defaultImage from '../../../assets/image/defualtImages.png';
import { useForm } from 'react-hook-form';
import { UpdateRequest } from '../../../api/UpdateRequest';

const UpdateProfile = ({ show, handleClose, userUpdate, fetchUser }) => {
    const [imagePreview, setImagePreview] = useState(defaultImage);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (userUpdate) {
            reset({
                name: userUpdate.name || '',
                phone: userUpdate.phone || '',
                address: userUpdate.address || '',
            });

            if (userUpdate?.image) {
                const userImageUrl = `${import.meta.env.VITE_API_KEY_URL}/${
                    userUpdate?.image
                }`;

                setImagePreview(userImageUrl);
            }
        }
    }, [userUpdate, reset]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') {
                    setImagePreview(reader.result);
                    setSelectedFile(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('address', data.address);

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        for (const value of formData.values()) {
            console.log(value);
        }

        const api = `${import.meta.env.VITE_API_KEY_URL}/api/user/${
            userUpdate?.email
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
            handleModalClose,
            fetchUser
        );
    };

    const handleModalClose = () => {
        handleClose();
        setImagePreview(defaultImage);
        setSelectedFile(null);
        reset();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            scrollable={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="modal-title ps-2 text-model-title"
                    id="contained-modal-title-vcenter"
                >
                    Update Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <div
                            className="employee-img-container"
                            onClick={handleImageClick}
                        >
                            <img
                                className="updated-img"
                                src={imagePreview}
                                alt="Profile Picture"
                                style={{ cursor: 'pointer' }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'profile')}
                                ref={fileInputRef}
                                className="form-control mt-2"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="mb-3 col-12">
                        <label className="mb-2 label-text d-flex gap-1">
                            Name <sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input w-100"
                            {...register('name', { required: true })}
                        />
                        {errors.name && (
                            <span className="text-danger error-text">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3 col-12">
                        <label className="mb-2 label-text d-flex gap-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input w-100"
                            {...register('phone')}
                        />
                    </div>
                    <div className="mb-3 col-12">
                        <label className="mb-2 label-text d-flex gap-1">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input w-100"
                            {...register('address')}
                        />
                    </div>

                    <div className="mt-2 mb-3 d-flex justify-content-center">
                        <input
                            type="submit"
                            className=" text-center btn btns w-100 "
                            value={`${
                                loading ? 'Updating...' : 'Update Profile'
                            }`}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProfile;
