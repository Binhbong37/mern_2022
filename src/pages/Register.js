import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alerts } from '../components';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false,
};

const Register = () => {
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        console.log(e.target);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    };

    // hàm để toogle cái isMember
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {values.showAlert && <Alerts />}
                {/* Name input */}
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* email input */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* Password input */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type="sumbit" className="btn btn-block">
                    {values.isMember ? 'Login' : 'Submit'}
                </button>
                <p>
                    {values.isMember
                        ? 'Not a member Yet ? '
                        : 'Already a member ? '}

                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
