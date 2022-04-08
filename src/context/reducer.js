import { SHOW_ALERT, REMOVE_ALERT } from './actions';

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
        default:
            throw new Error('No action');
    }
};

export default reducer;
