import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import Loading from '../../components/loading/Loading';

const AdminRoutes = ({ children }) => {
    const [users, isLoading] = useLoggedInUser();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (isLoading || isAdminLoading) {
        return <Loading />;
    }

    if (users && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
