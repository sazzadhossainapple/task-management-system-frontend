import { IoMdAddCircle } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import TaskList from '../../../components/task/TaskList';
import { useEffect, useRef, useState } from 'react';
import TaskAdd from '../../../components/task/TaskAdd';
import { debounce } from 'lodash';
import Loading from '../../../components/loading/Loading';
import { GetRequest } from '../../../api/GetRequest';
import Pagination from '../../../components/Pagination/Pagination';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { all } from 'axios';

const Task = () => {
    const [users] = useLoggedInUser();
    const [modalAddTask, setModalAddTask] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(1);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const debouncedFetch = debounce(() => {
            currentPage.current = 1;
            getPaginationList();
        }, 300);

        debouncedFetch();
        return () => {
            debouncedFetch.cancel();
        };
    }, [limit, status, date]);

    useEffect(() => {
        getByUsers();
    }, []);

    const handleAddTaskClose = () => setModalAddTask(false);
    const handleAddTaskShow = () => setModalAddTask(true);

    const getPaginationList = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/task?page=${
            currentPage.current
        }&limit=${limit}&status=${status}&dueDate=${date}`;

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

            const totalTasks = data?.data?.totalTaskLists || 0;
            const totalPages = Math.ceil(totalTasks / limit);

            setPageCount(totalPages);
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

    const handlePageClick = (e) => {
        currentPage.current = e.selected + 1;
        getPaginationList();
    };

    if (isLoading) {
        return <Loading />;
    }

    function resetButton() {
        setStatus('');
        setDate('');
    }

    return (
        <div className="home-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="dashboard-title">Task</h3>
                <div>
                    <button onClick={handleAddTaskShow} className="btn btns">
                        <IoMdAddCircle className="add-icon" /> Add Task
                    </button>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-2">
                    <label className="mb-2 label-text d-flex gap-1 ">
                        Status
                    </label>
                    <select
                        className="form-select px-3 py-2 form-modal-input"
                        placeholder="Select Type"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="" selected>
                            Select Status
                        </option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="mb-2 label-text d-flex gap-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        className="form-control px-3 py-2 form-modal-input"
                        placeholder="Enter Due Date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                </div>
                <div className="col-md-2" style={{ marginTop: '43px' }}>
                    <button
                        onClick={resetButton}
                        className="btn btn-danger py-1"
                    >
                        Reset
                    </button>
                </div>
            </div>

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
                            <th scope="col" className="align-middle table-th">
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
                            allTasks?.map((data, index) => (
                                <TaskList
                                    key={index}
                                    data={data}
                                    slNo={
                                        (currentPage.current - 1) * limit +
                                        index +
                                        1
                                    }
                                    getPaginationList={getPaginationList}
                                    users={users}
                                    allUsers={allUsers}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <Pagination
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                />
            </div>

            <TaskAdd
                show={modalAddTask}
                handleClose={handleAddTaskClose}
                getPaginationList={getPaginationList}
                allUsers={allUsers}
            />
        </div>
    );
};

export default Task;
