import React from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';
import { useAppContext } from '../context/appContext';
import Logo from './Logo.js';

const Navbar = () => {
    const { toggleSlidebar } = useAppContext();
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
                        onClick={() => console.log('Show/hide dropdown')}
                    >
                        <FaUserCircle />
                        Binh
                        <FaCaretDown />
                    </button>
                    <div className="dropdown show-dropdown">
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={() => console.log('logOut User')}
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
