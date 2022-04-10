const createJob = (req, res) => {
    res.send('CREATED JOB');
};
const updateJob = (req, res) => {
    res.send('Update JOB');
};
const deleteJob = (req, res) => {
    res.send('Deleted JOB');
};
const getAllJobs = (req, res) => {
    res.send('GET ALL JOB');
};
const showStats = (req, res) => {
    res.send('Show star JOB');
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
