import { createBrowserRouter } from 'react-router-dom';
import Error from '../../components/error/Error';
import { lazy } from 'react';

const MainLayout = lazy(() => import('../../layout/MainLayout/MainLayout'));
const Home = lazy(() => import('../../pages/public/home/Home'));
const ForgotPassword = lazy(() =>
    import('../../pages/public/forgotPassword/ForgotPassword')
);
const DashboardLayout = lazy(() =>
    import('../../layout/DasboardLayout/DashboardLayout')
);
const Dashboard = lazy(() =>
    import('../../pages/dashboard/Dashboard/Dashboard')
);

const Task = lazy(() => import('../../pages/dashboard/task/Task'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/forgot-password', element: <ForgotPassword /> },
        ],
    },
    {
        path: '/dashboard',
        element: (
            // <PrivateRoutes>
            <DashboardLayout />
            // </PrivateRoutes>
        ),
        errorElement: <Error />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/dashboard/task',
                element: <Task />,
            },
        ],
    },
]);
