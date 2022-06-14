import React from 'react';
import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSideBar = () => {
    const { showSlidebar, toggleSlidebar } = useAppContext();
    return (
        <Wrapper>
            <div
                className={
                    showSlidebar
                        ? 'sidebar-container show-sidebar'
                        : 'sidebar-container'
                }
            >
                <div className="content">
                    <button
                        type="button"
                        className="close-btn"
                        onClick={toggleSlidebar}
                    >
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSlidebar={toggleSlidebar} />
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSideBar;
