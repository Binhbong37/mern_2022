import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, SmallSideBar, BigSidebar } from '../../components';

const ShareLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSideBar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

export default ShareLayout;
