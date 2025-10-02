import { FaTasks } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';
import { MdOutlineDashboard } from 'react-icons/md';

export const dashboardNavName = [
    {
        id: 1,
        link: '/dashboard',
        icon: <MdOutlineDashboard />,
        title: 'Dashboard',
        user_type: ['User', 'Admin'],
    },
    {
        id: 2,
        link: '/dashboard/user',
        icon: <ImUsers />,
        title: 'User',
        user_type: ['Admin'],
    },
    {
        id: 2,
        link: '/dashboard/task',
        icon: <FaTasks />,
        title: 'Task',
        user_type: ['User', 'Admin'],
    },
];
