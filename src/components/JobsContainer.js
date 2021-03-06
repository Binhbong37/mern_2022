import React, { useEffect } from 'react';

import { useAppContext } from '../context/appContext';
import Job from './Job';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer.js';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {
        getJobs,
        jobs,
        isLoading,
        page,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort,
        numOfPages,
    } = useAppContext();

    useEffect(() => {
        getJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, searchStatus, searchType, sort]);

    if (isLoading) {
        return <Loading center />;
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display ...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h5>
            <div className="jobs">
                {jobs.map((job, index) => {
                    return <Job key={index} {...job} />;
                })}
            </div>
            {/* Panigation */}
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default JobsContainer;
