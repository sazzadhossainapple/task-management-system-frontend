import axios from 'axios';
import toast from 'react-hot-toast';

export const UpdateRequest = async (
    data,
    config,
    api,
    setLoading,
    reset = () => {},
    handleClose = () => {}, // Default to an empty function
    getPaginationList = () => {},
    navigate = null
) => {
    try {
        const res = await axios.put(api, data, config);
        if (res.status === 200) {
            getPaginationList();
            toast.success(res.data?.message);
            reset();
            handleClose();
            if (navigate) {
                navigate(); // Only call navigate if it's provided
            }
            return res.data;
        }
    } catch (error) {
        console.error(
            'Error during API call:',
            error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
        setLoading(false);
    }
    return null;
};
