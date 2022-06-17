import {
    SHOW_ALERT,
    REMOVE_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SLIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
                alertText: 'Fill all blank!!',
                alertType: 'danger',
            };
        case REMOVE_ALERT:
            return {
                ...state,
                showAlert: false,
                alertText: '',
                alertType: '',
            };
        case REGISTER_USER_BEGIN:
        case LOGIN_USER_BEGIN:
        case UPDATE_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.loctaion,
                jobLocation: action.payload.loctaion,
                showAlert: true,
                alertText: 'User created, Redirecting . . . ',
                alertType: 'success',
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.loctaion,
                jobLocation: action.payload.loctaion,
                showAlert: true,
                alertText: 'Login Successful !! Redirect . . .',
                alertType: 'success',
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.loctaion,
                jobLocation: action.payload.loctaion,
                showAlert: true,
                alertText: 'User profile updated',
                alertType: 'success',
            };
        case REGISTER_USER_ERROR:
        case LOGIN_USER_ERROR:
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'danger',
            };
        case TOGGLE_SLIDEBAR:
            return {
                ...state,
                showSlidebar: !state.showSlidebar,
            };
        case LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                userLocation: '',
                jobLocation: '',
            };
        default:
            throw new Error('No action');
    }
};

export default reducer;
