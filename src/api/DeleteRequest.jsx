import axios from 'axios';
import toast from 'react-hot-toast';

export const DeleteRequest = async (
    api,
    getPaginationList = () => {},
    title,
    handleCloseConfirmation
) => {
    try {
        const response = await axios.delete(api, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('taskToken')}`,
            },
        });

        if (response.status === 200) {
            getPaginationList();
            handleCloseConfirmation();
            toast.success(`${title} has been deleted`);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};
