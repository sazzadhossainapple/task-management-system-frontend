import axios from 'axios';

export const GetRequest = async ({
    url,
    method = 'GET',
    headers = {},
    body = null,
}) => {
    try {
        const response = await axios({
            url,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            data: body,
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
