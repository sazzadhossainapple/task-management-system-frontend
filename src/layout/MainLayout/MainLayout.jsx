import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../hooks/ScrollToTop';

const MainLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default MainLayout;
