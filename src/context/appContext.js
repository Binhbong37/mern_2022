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
    TOGGLE_SLIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
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
    CLEAR_FILTERS,
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
    showSlidebar: false,

    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'intership'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',

    // Get allJob
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,

    // stats
    stats: {},
    monthApplycation: [],

    // Search
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Custom axios
    // 1. Đây là 1 cách
    // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    // 2. cách khác
    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    // 3. cách nữa (request)
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // 4. cách nữa (response)
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser();
                console.log('AUTH ERR');
            }
            return Promise.reject(error);
        }
    );
    const displayAlert = () => {
        dispatch({ type: SHOW_ALERT });
        removeAlert();
    };

    const removeAlert = () => {
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT });
        }, 3000);
    };

    // Save data in LocalStorage
    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    };
    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
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
            const { user, token, location } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location },
            });
            // save in LocalStorage
            addUserToLocalStorage({ user, token, location });
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
            const { user, token, location } = data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location },
            });
            // save in LocalStorage
            addUserToLocalStorage({ user, token, location });
        } catch (error) {
            console.log('ERR: ', error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }

        removeAlert();
    };

    // UpdateUser
    const updateUser = async (currentUsers) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch(
                '/auth/updateUser',
                currentUsers
            );
            console.log('udateData: ', data);
            const { user, token, location } = data;
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token, location },
            });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            console.log('UpdateData', err.response);
            if (err.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: err.response.data.msg },
                });
            }
        }
        removeAlert();
    };

    const toggleSlidebar = () => {
        dispatch({
            type: TOGGLE_SLIDEBAR,
        });
    };

    const logoutUser = () => {
        dispatch({
            type: LOGOUT_USER,
        });

        removeUserToLocalStorage();
    };

    // handleChange value
    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value },
        });
    };
    // clear value
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    };

    // Create Job
    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;
            await authFetch.post('/jobs', {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({
                type: CREATE_JOB_SUCCESS,
            });

            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.data.msg === 401) return;
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        removeAlert();
    };
    // Get all jobs
    const getJobs = async () => {
        const { search, searchStatus, searchType, sort } = state;
        let url = `jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        dispatch({ type: GET_JOBS_BEGIN });

        try {
            const { data } = await authFetch(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, totalJobs, numOfPages },
            });
        } catch (error) {
            console.log(error.response);
            logoutUser();
        }
        removeAlert();
    };

    // Edit job
    const setEditJob = (id) => {
        dispatch({
            type: GET_EDIT_JOB,
            payload: { id },
        });
    };

    // sTART edit
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });
        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
                editJobId,
            } = state;
            await authFetch.patch(`/jobs/${editJobId}`, {
                company,
                position,
                jobType,
                jobLocation,
                status,
            });
            dispatch({ type: EDIT_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR,
                paylod: { msg: error.response.data.msg },
            });
        }
        removeAlert();
    };
    // Delete job
    const deleteJob = async (id) => {
        dispatch({ type: DELETE_JOB });

        try {
            await authFetch.delete(`/jobs/${id}`);
            getJobs();
        } catch (error) {
            console.log(error.response.data.msg);
            logoutUser();
        }
    };

    // stats
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN });

        try {
            const { data } = await authFetch('/jobs/stats');
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaulStats,
                    monthApplycation: data.monthApplycation,
                },
            });
        } catch (error) {
            console.log(error.response);
            // logoutUser()
        }
        removeAlert();
    };

    // Form search
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                toggleSlidebar,
                logoutUser,
                updateUser,
                handleChange,
                clearValues,
                createJob,
                getJobs,
                setEditJob,
                deleteJob,
                editJob,
                showStats,
                clearFilter,
            }}
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
