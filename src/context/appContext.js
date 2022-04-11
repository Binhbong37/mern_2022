import { useContext, useReducer, createContext } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
    SHOW_ALERT,
    REMOVE_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: SHOW_ALERT });
        removeAlert();
    };

    const removeAlert = () => {
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT });
        }, 5000);
    };

    // Save data in LocalStorage
    const addUserToLocalStorage = ({ user, token, loctaion }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', loctaion);
    };
    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('loction');
    };
    // register
    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                '/api/v1/auth/register',
                currentUser
            );
            console.log({ response });
            const { user, token, loctaion } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, loctaion },
            });
            // save in LocalStorage
            addUserToLocalStorage({ user, token, loctaion });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }

        removeAlert();
    };

    // LOIGN
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const { data } = await axios.post(
                '/api/v1/auth/login',
                currentUser
            );
            const { user, token, loctaion } = data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, loctaion },
            });
            // save in LocalStorage
            addUserToLocalStorage({ user, token, loctaion });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }

        removeAlert();
    };
    return (
        <AppContext.Provider
            value={{ ...state, displayAlert, registerUser, loginUser }}
        >
            {children}
        </AppContext.Provider>
    );
};
// Dưới sẽ là sử dụng createContext đã tạo ở trên, đồng thời export cả 2 ra để ngoài có thể dùng

const useAppContext = () => {
    return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
