import React from 'react';

import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alerts, FormRow, FormRowSelect } from '../../components';

const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!position || !company || !jobLocation) {
        //     displayAlert();
        //     return;
        // }

        // Check điều kiện nếu đã có thì là update, còn không thì là thêm mới
        if (isEditing) {
            return;
        }
        createJob();
    };

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange({ name, value });
    };
    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
                {showAlert && <Alerts />}

                <div className="form-center">
                    {/* position */}
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type="text"
                        labelText={'location'}
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name="jobType"
                        labelText="type"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    {/* job status */}
                    <FormRowSelect
                        name={'status'}
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    <div className="btn-container">
                        {/* btn submit */}
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
