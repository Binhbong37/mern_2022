import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
const Error = () => {
    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="Not found" />
                <h3>Ohh! Page not Found</h3>
                <p>We can't seem to find page you looking for!</p>
                <Link to={'/'}>Back to home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;
