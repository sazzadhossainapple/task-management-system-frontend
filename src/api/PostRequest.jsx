import axios from 'axios';
import toast from 'react-hot-toast';

export const PostRequest = async (
    data,
    config,
    api,
    setLoading,
    reset,
    handleClose = () => {},
    getPaginationList = () => {},
    navigate = null
) => {
    try {
        const res = await axios.post(api, data, config);

        if (res.status === 200 || res.status === 201) {
            setLoading(false);
            getPaginationList();
            toast.success(res.data.message);
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
            error.response?.data ||
                error?.response?.data?.error ||
                error.message
        );

        toast.error(
            error.response?.data?.message ||
                error?.response?.data?.error ||
                'An error occurred'
        );
    } finally {
        setLoading(false);
    }
    return null;
};
