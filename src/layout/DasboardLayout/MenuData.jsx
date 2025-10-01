import { FaTasks } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

export const dashboardNavName = [
    {
        id: 1,
        link: '/dashboard',
        icon: <MdOutlineDashboard />,
        title: 'Dashboard',
        user_type: '',
    },
    {
        id: 2,
        link: '/dashboard/task',
        icon: <FaTasks />,
        title: 'Task',
        user_type: '',
    },
];
