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
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    GET_EDIT_JOB,
    DELETE_JOB,
    EDIT_JOB_BEGIN,
    EDIT_JOB_ERROR,
    EDIT_JOB_SUCCESS,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
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
        case CREATE_JOB_BEGIN:
        case EDIT_JOB_BEGIN:
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
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New job created',
            };
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages,
            };
        case GET_JOBS_BEGIN:
        case SHOW_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            };
        case SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthApplycation: action.payload.monthApplycation,
            };
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'Job Updated',
                alertType: 'success',
            };
        case REGISTER_USER_ERROR:
        case LOGIN_USER_ERROR:
        case UPDATE_USER_ERROR:
        case CREATE_JOB_ERROR:
        case EDIT_JOB_ERROR:
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
        case HANDLE_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case CLEAR_VALUES:
            const intialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending',
            };
            return {
                ...state,
                ...intialState,
            };
        case GET_EDIT_JOB:
            const job = state.jobs.find((job) => job._id === action.payload.id);
            const { _id, position, company, jobLocation, jobType, status } =
                job;
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            };
        case DELETE_JOB:
            return {
                ...state,
                isLoading: true,
            };
        default:
            throw new Error('No action');
    }
};

export default reducer;
