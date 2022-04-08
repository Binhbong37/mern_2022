import { useContext, useReducer, createContext } from 'react';
import reducer from './reducer';
import { SHOW_ALERT, REMOVE_ALERT } from './actions';

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
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
    return (
        <AppContext.Provider value={{ ...state, displayAlert }}>
            {children}
        </AppContext.Provider>
    );
};
// Dưới sẽ là sử dụng createContext đã tạo ở trên, đồng thời export cả 2 ra để ngoài có thể dùng

const useAppContext = () => {
    return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
