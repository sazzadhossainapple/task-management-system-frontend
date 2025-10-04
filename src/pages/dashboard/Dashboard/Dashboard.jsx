import { FaTasks } from 'react-icons/fa';
import TaskList from '../../../components/task/TaskList';
import { useEffect, useState } from 'react';
import { GetRequest } from '../../../api/GetRequest';
import Loading from '../../../components/loading/Loading';
import useLoggedInUser from '../../../hooks/useLoggedInUser';

const Dashboard = () => {
    const [users] = useLoggedInUser();
    const [allTasks, setAllTasks] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getPaginationList();
        getByUsers();
    }, []);

    const getPaginationList = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/task`;

        try {
            const data = await GetRequest({
                url,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'taskToken'
                    )}`,
                },
            });

            console.log(data);

            setAllTasks(data?.data?.Tasks || []);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const getByUsers = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/user`;

        try {
            const data = await GetRequest({
                url,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'taskToken'
                    )}`,
                },
            });

            setAllUsers(data?.data?.users || []);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    const taskSummary = {
        total: allTasks.length || 0,
        pending:
            allTasks.filter((task) => task.status === 'Pending').length || 0,
        inProgress:
            allTasks.filter((task) => task.status === 'In Progress').length ||
            0,
        completed:
            allTasks.filter((task) => task.status === 'Completed').length || 0,
    };

    const cards = [
        {
            title: 'Total Task',
            count: taskSummary.total || 0,
            badge: null,
            badgeColor: '',
        },
        {
            title: 'Pending Task',
            count: taskSummary.pending || 0,
            badge: 'Pending',
            badgeColor: 'bg-secondary',
        },
        {
            title: 'In Progress Task',
            count: taskSummary.inProgress || 0,
            badge: 'In Progress',
            badgeColor: 'bg-warning',
        },
        {
            title: 'Completed Task',
            count: taskSummary.completed || 0,
            badge: 'Completed',
            badgeColor: 'bg-success',
        },
    ];

    return (
        <div className="home-content">
            <h3 className="dashboard-title mb-5">Dashboard</h3>

            <div className="grid-col-4 gap-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded p-4 shadow position-relative"
                    >
                        <p className="dashboard-card-small-tilte d-flex gap-2 align-items-center">
                            <FaTasks />
                            {card.title}
                        </p>

                        <h3 className="dashboard-card-title mt-3 fw-bold">
                            {card.count}
                        </h3>

                        {card.badge && (
                            <span
                                className={`fw-semibold badge text-white ${card.badgeColor} position-absolute end-0 me-3`}
                                style={{ fontSize: '10px', bottom: '15px' }}
                            >
                                {card.badge}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <h3
                    className="dashboard-title mb-3"
                    style={{ fontSize: '18px' }}
                >
                    Task List
                </h3>
                <div className="table-responsive">
                    <table className="table table-light table-bordered">
                        <thead>
                            <tr className="table-tr">
                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Sl. No.
                                </th>
                                <th
                                    scope="col"
                                    className="align-middle table-th"
                                >
                                    Assigned User
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Due Date
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Status
                                </th>

                                <th
                                    scope="col"
                                    className="text-center align-middle table-th"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTasks?.length === 0 ? (
                                <tr>
                                    <td
                                        className="text-center align-middle table-text fw-bold"
                                        colSpan={7}
                                    >
                                        No Task Avaliable
                                    </td>
                                </tr>
                            ) : (
                                allTasks
                                    ?.slice(0, limit)
                                    .map((data, index) => (
                                        <TaskList
                                            key={index}
                                            data={data}
                                            slNo={index + 1}
                                            getPaginationList={
                                                getPaginationList
                                            }
                                            users={users}
                                            allUsers={allUsers}
                                        />
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
