import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alerts } from '../components';
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

const Register = () => {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();
    console.log({ navigate });
    const {
        user,
        showAlert,
        isLoading,
        displayAlert,
        registerUser,
        loginUser,
    } = useAppContext();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, isMember } = values;
        if (!email || !password || (!name && !isMember)) {
            return displayAlert();
        }
        const currentUser = { name, email, password };
        if (isMember) {
            loginUser(currentUser);
        } else {
            registerUser(currentUser);
        }
    };
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [user, navigate]);

    // hàm để toogle cái isMember
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alerts />}
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
                <button
                    type="sumbit"
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    Submit
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
