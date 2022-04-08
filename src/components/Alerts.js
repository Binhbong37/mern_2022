import React from 'react';
import { useAppContext } from '../context/appContext';

const Alerts = () => {
    const { alertText, alertType } = useAppContext();

    return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alerts;
