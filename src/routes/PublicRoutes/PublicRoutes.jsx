import { createBrowserRouter } from 'react-router-dom';
import Error from '../../components/error/Error';
import { lazy } from 'react';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import AdminRoutes from '../AdminRoutes/AdminRoutes';

const MainLayout = lazy(() => import('../../layout/MainLayout/MainLayout'));
const Home = lazy(() => import('../../pages/public/home/Home'));
const ForgotPassword = lazy(() =>
    import('../../pages/public/forgotPassword/ForgotPassword')
);
const ResetPassword = lazy(() =>
    import('../../pages/public/ResetPassword/ResetPassword')
);
const DashboardLayout = lazy(() =>
    import('../../layout/DasboardLayout/DashboardLayout')
);
const Dashboard = lazy(() =>
    import('../../pages/dashboard/Dashboard/Dashboard')
);
const User = lazy(() => import('../../pages/dashboard/User/User'));
const Profile = lazy(() => import('../../pages/dashboard/Profile/Profile'));
const ChangePassword = lazy(() =>
    import('../../pages/dashboard/Profile/ChangePassword')
);
const Task = lazy(() => import('../../pages/dashboard/Task/Task'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/forgot-password', element: <ForgotPassword /> },
            { path: '/reset-password', element: <ResetPassword /> },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoutes>
                <DashboardLayout />
            </PrivateRoutes>
        ),
        errorElement: <Error />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },

            {
                path: '/dashboard/profile',
                element: <Profile />,
            },
            {
                path: '/dashboard/change-password',
                element: <ChangePassword />,
            },
            {
                path: '/dashboard/user',
                element: (
                    <AdminRoutes>
                        <User />
                    </AdminRoutes>
                ),
            },
            {
                path: '/dashboard/task',
                element: <Task />,
            },
        ],
    },
]);
