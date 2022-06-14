import React from 'react';

import Wrapper from '../assets/wrappers/BigSidebar';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';

const BigSidebar = () => {
    const { showSlidebar, toggleSlidebar } = useAppContext();
    return (
        <Wrapper>
            <div
                className={
                    showSlidebar
                        ? 'sidebar-container'
                        : 'sidebar-container show-sidebar'
                }
            >
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSlidebar={toggleSlidebar} />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;
