import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppContext } from '../context/appContext';
import links from '../utils/link';
import Logo from './Logo';

const SmallSideBar = () => {
    return (
        <Wrapper>
            <div className="sidebar-container show-sidebar">
                <div className="content">
                    <button
                        type="button"
                        className="close-btn"
                        onClick={() => console.log('toogle sidebar')}
                    >
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSideBar;
