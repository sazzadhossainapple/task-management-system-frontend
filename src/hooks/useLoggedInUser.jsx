import { useEffect, useState, useCallback } from 'react';

const useLoggedInUser = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('taskToken');

    const fetchUser = useCallback(async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_KEY_URL}/api/user/me`,
                {
                    method: 'GET',
                    headers: { authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const result = await response.json();
            setUsers(result?.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            if (isMounted) {
                await fetchUser();
            }
        };

        init();

        return () => {
            isMounted = false;
        };
    }, [fetchUser]);

    return [users, isLoading, fetchUser, setIsLoading];
};

export default useLoggedInUser;
