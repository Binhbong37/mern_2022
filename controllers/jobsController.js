import Job from '../model/Job.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequest, NotFound } from '../errors/index.js';

const createJob = async (req, res) => {
    const { position, company } = req.body;
    if (!position || !company) {
        throw new BadRequest('Please provide all values');
    }

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = (req, res) => {
    res.send('Update JOB');
};
const deleteJob = (req, res) => {
    res.send('Deleted JOB');
};
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs: jobs.length,
        numOfPages: 1,
    });
};
const showStats = (req, res) => {
    res.send('Show star JOB');
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
