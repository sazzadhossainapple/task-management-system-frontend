import { IoMdAddCircle } from 'react-icons/io';
import UserList from '../../../components/user/UserList';
import { useState } from 'react';
import UserAdd from '../../../components/user/UserAdd';

const User = () => {
    const [modalAddUser, setModalAddUser] = useState(false);

    const handleAddUserClose = () => setModalAddUser(false);
    const handleAddUserShow = () => setModalAddUser(true);

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
            {/* {allNotice?.length === 0 ? (
                        <div className="min-vh-100 d-flex align-items-center justify-content-center">
                            No Notice Avaliable
                        </div>
                    ) : ( */}
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
                                className="text-center align-middle table-th"
                            >
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
                        <UserList />
                    </tbody>
                </table>
            </div>
            {/* // )} */}
            <div className="mt-4">
                {/* <ReactPaginate
                            breakLabel="......."
                            nextLabel="»"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="«"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={2}
                            containerClassName="pagination justify-content-end"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        /> */}
            </div>
            <UserAdd show={modalAddUser} handleClose={handleAddUserClose} />
        </div>
    );
};

export default User;
