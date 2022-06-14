import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppContext } from '../context/appContext';
import links from '../utils/link';
import Logo from './Logo';

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
                    <div className="nav-links">
                        {links.map((link) => {
                            const { id, text, path, icon } = link;
                            return (
                                <NavLink
                                    to={path}
                                    key={id}
                                    onClick={toggleSlidebar}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }
                                >
                                    <span className="icon">{icon}</span>
                                    {text}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSideBar;
