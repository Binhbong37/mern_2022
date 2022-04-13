import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
const ShareLayout = () => {
    return (
        <Wrapper>
            <nav>
                <Link to="add-job">Add Job</Link>
                <Link to="all-jobs">All job</Link>
            </nav>
            <Outlet />
        </Wrapper>
    );
};

export default ShareLayout;
