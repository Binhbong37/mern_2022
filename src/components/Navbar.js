import React, { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';
import { useAppContext } from '../context/appContext';
import Logo from './Logo.js';

const Navbar = () => {
    const { user, toggleSlidebar, logoutUser } = useAppContext();

    const [showLogout, setShowLogout] = useState(false);
    return (
        <Wrapper>
            <div className="nav-center">
                <button className="toggle-btn" onClick={toggleSlidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>

                    <div
                        className={
                            showLogout ? 'dropdown show-dropdown' : 'dropdown'
                        }
                    >
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={logoutUser}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;
