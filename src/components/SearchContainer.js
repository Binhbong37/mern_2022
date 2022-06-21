import React from 'react';

import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from './';

const SearchContainer = () => {
    const {
        isLoading,
        search,
        sortOptions,
        searchStatus,
        searchType,
        sort,
        clearFilter,
        jobTypeOptions,
        statusOptions,
        handleChange,
    } = useAppContext();

    const handleSearch = (e) => {
        if (isLoading) return;

        handleChange({ name: e.target.name, value: e.target.value });
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        clearFilter();
    };
    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    {/* Search postion */}
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={handleSearch}
                    />
                    {/* Search by status */}
                    <FormRowSelect
                        labelText="status"
                        name="searchStatus"
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['all', ...statusOptions]}
                    />
                    {/* Search by jobtype */}
                    <FormRowSelect
                        labelText="type"
                        name="searchType"
                        value={searchType}
                        handleChange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    />
                    {/* sort */}
                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    />
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        Clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
