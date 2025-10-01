import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Image from '../../assets/image/defualtImages.png';
import { dashboardNavName } from './MenuData';

import { GoDotFill } from 'react-icons/go';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineNotifications, MdOutlineWatchLater } from 'react-icons/md';
const DashboardLayout = () => {
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    const logOut = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderMenu = () =>
        dashboardNavName?.map((item, index) => (
            <li key={index} onClick={showSidebar}>
                <NavLink
                    to={item.link}
                    className="nav-link gap-2 nav-link-items"
                    end
                >
                    <i className="m-0 p-0">{item.icon}</i>
                    <span className="links_name">{item.title}</span>
                </NavLink>
            </li>
        ));

    return (
        <div>
            <Offcanvas
                className="sidebar"
                style={{ background: '#251e73', width: '250px' }}
                show={show}
                onHide={handleClose}
            >
                <Offcanvas.Header closeButton>
                    <div className="logo-details">
                        <div className="d-flex align-items-center gap-2">
                            <span className="login-title-logo text-white">
                                TASK
                            </span>
                        </div>
                    </div>
                </Offcanvas.Header>

                <ul className="nav-links" sidebar={sidebar}>
                    {renderMenu()}
                </ul>
            </Offcanvas>
            <div className="sidebar d-none d-lg-block ">
                <div className="logo-details">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <span className="login-title-logo text-white">
                            TASK
                        </span>
                    </div>
                </div>
                <ul className="nav-links" sidebar={sidebar}>
                    {renderMenu()}
                </ul>
            </div>
            <section className="home-section">
                <nav className="d-flex align-items-center">
                    <div className="sidebar-button">
                        <button
                            type="button"
                            className="d-xl-none bg-transparent border-0 "
                            onClick={handleShow}
                        >
                            <FaBars className="bars-icon" />
                        </button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown className="bg-transparent">
                            <Dropdown.Toggle
                                variant=""
                                id="dropdown-basic"
                                className="border-0 notification-container position-relative"
                            >
                                <MdOutlineNotifications />

                                <span className="notification-badge">
                                    <span>0</span>
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification">
                                <p className="notification-title">
                                    Notifications
                                </p>

                                <div className="notification-body">
                                    <Dropdown.Item className="notification-read">
                                        <Link>
                                            <p className="noti-body-title mb-0">
                                                text
                                            </p>
                                            <p className="noti-body-time mb-0">
                                                <span className="noti-body-time-icon">
                                                    <MdOutlineWatchLater />
                                                </span>
                                                <span>10:00 AM</span>
                                            </p>
                                            <p className="noti-body-description">
                                                some text
                                            </p>
                                        </Link>
                                    </Dropdown.Item>
                                </div>

                                <div className="notification-footer">
                                    <Link to="">View all</Link>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="d-flex align-items-center gap-3">
                            <div>
                                <h3
                                    className="text-end p-0 m-0"
                                    style={{ fontSize: '12px' }}
                                >
                                    <span>Hello,</span>{' '}
                                    <span className="fw-bold">
                                        Sazzad Hossain
                                    </span>
                                </h3>
                                <h6
                                    className="user-name text-capitalize text-end px-0 pb-0 pt-1 m-0"
                                    style={{ fontSize: '10px' }}
                                >
                                    User
                                </h6>
                            </div>
                            <div className="bg-transparent dropdown-content position-relative">
                                <div className="user-img">
                                    <img
                                        src={Image}
                                        loading="lazy"
                                        width={35}
                                        height={35}
                                        // src={`${
                                        //     import.meta.env.VITE_API_KEY_URL
                                        // }/assets/${users?.employee?.image}`}
                                        alt="Profile Picture"
                                        // onError={(e) => (e.target.src = Image)}
                                    />
                                </div>
                            </div>

                            <Dropdown
                                className="bg-transparent"
                                style={{ marginLeft: '-15px' }}
                            >
                                <Dropdown.Toggle className="bg-transparent position-relative border-0 text-black">
                                    <div className="d-flex flex-column">
                                        <GoDotFill
                                            style={{ fontSize: '6px' }}
                                        />
                                        <GoDotFill
                                            style={{ fontSize: '6px' }}
                                        />
                                        <GoDotFill
                                            style={{ fontSize: '6px' }}
                                        />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link
                                            to="/dashboard/profile"
                                            className="text-dark w-100 d-block"
                                        >
                                            <CgProfile />
                                            <span> Profile</span>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link
                                            to="/dashboard/change-password"
                                            className="text-dark w-100 d-block"
                                        >
                                            <RiLockPasswordLine />{' '}
                                            <span> Change Password</span>
                                        </Link>
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item
                                        onClick={logOut}
                                        className="text-danger"
                                    >
                                        <AiOutlineLogout />
                                        <span> Log Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
                <Outlet />
            </section>
        </div>
    );
};

export default DashboardLayout;
