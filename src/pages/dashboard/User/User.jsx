import { IoMdAddCircle } from 'react-icons/io';
import UserList from '../../../components/user/UserList';
import { useEffect, useRef, useState } from 'react';
import UserAdd from '../../../components/user/UserAdd';
import { debounce } from 'lodash';
import { GetRequest } from '../../../api/GetRequest';
import Loading from '../../../components/loading/Loading';
import ReactPaginate from 'react-paginate';
import Pagination from '../../../components/pagination/Pagination';
import useLoggedInUser from '../../../hooks/useLoggedInUser';

const User = () => {
    const [users] = useLoggedInUser();
    const [modalAddUser, setModalAddUser] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(1);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const debouncedFetch = debounce(() => {
            currentPage.current = 1;
            getPaginationList();
        }, 300);

        debouncedFetch();
        return () => {
            debouncedFetch.cancel();
        };
    }, [limit]);

    const handleAddUserClose = () => setModalAddUser(false);
    const handleAddUserShow = () => setModalAddUser(true);

    const getPaginationList = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/user?page=${
            currentPage.current
        }&limit=${limit}`;

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

            const totalUsers = data?.data?.totalUserLists || 0;
            const totalPages = Math.ceil(totalUsers / limit);

            setPageCount(totalPages);
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

    return (
        <div className="home-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="dashboard-title">User</h3>
                <div>
                    <button onClick={handleAddUserShow} className="btn btns">
                        <IoMdAddCircle className="add-icon" /> Add User
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
                                User
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Role
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
                        {allUsers?.length === 0 ? (
                            <tr>
                                <td
                                    className="text-center align-middle table-text fw-bold"
                                    colSpan={7}
                                >
                                    No User Avaliable
                                </td>
                            </tr>
                        ) : (
                            allUsers?.map((user, index) => (
                                <UserList
                                    key={index}
                                    user={user}
                                    slNo={
                                        (currentPage.current - 1) * limit +
                                        index +
                                        1
                                    }
                                    getPaginationList={getPaginationList}
                                    users={users}
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
            <UserAdd
                show={modalAddUser}
                handleClose={handleAddUserClose}
                getPaginationList={getPaginationList}
            />
        </div>
    );
};

export default User;
