import { useEffect, useState } from 'react';

function useAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    const token = localStorage.getItem('taskToken');

    useEffect(() => {
        if (token) {
            fetch(`${import.meta.env.VITE_API_KEY_URL}/api/user/admin`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsAdmin(data?.data);
                    setIsAdminLoading(false);
                });
        } else {
            setIsAdminLoading(false);
        }
    }, []);

    return [isAdmin, isAdminLoading];
}

export default useAdmin;
