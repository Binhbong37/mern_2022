import Job from '../model/Job.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequest, NotFound } from '../errors/index.js';
import checkPermission from '../utils/checkPermission.js';

const createJob = async (req, res) => {
    const { position, company } = req.body;
    if (!position || !company) {
        throw new BadRequest('Please provide all values');
    }

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { position, company } = req.body;
    if (!position || !company) {
        throw new BadRequest('Please provide all values');
    }

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFound(`No job with id ${jobId}`);
    }

    // Sau khi đã pass hết thì update

    // Có nhiều cách để update c1 như bên dưới

    // check Pemission
    checkPermission(req.user, job.createdBy);
    const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(StatusCodes.OK).json({ updateJob });

    // CÁCH 2
    // job.position = position;
    // job.company = company;

    // await job.save();
    // res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFound(`No job with id ${jobId}`);
    }

    checkPermission(req.user, job.createdBy);

    await job.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
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
