import React, { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import { ChartContainer, StatsComponent, Loading } from '../../components';
const Stats = () => {
    const { showStats, isLoading, monthApplycation } = useAppContext();

    useEffect(() => {
        showStats();
    }, []);

    if (isLoading) {
        return <Loading center />;
    }
    return (
        <>
            <StatsComponent />
            {monthApplycation.length > 0 && <ChartContainer />}
        </>
    );
};

export default Stats;
