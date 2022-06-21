import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

import Job from '../model/Job.js';
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
    const { status, jobType, sort, search } = req.query;

    const queryObj = {
        createdBy: req.user.userId,
    };

    // Check cac điều kiện xảy ra
    if (status && status !== 'all') {
        queryObj.status = status;
    }
    if (jobType && jobType !== 'all') {
        queryObj.jobType = jobType;
    }
    if (search) {
        queryObj.position = { $regex: search, $options: 'i' };
    }

    let result = Job.find(queryObj);

    // Sort
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('position');
    }
    if (sort === 'z-a') {
        result = result.sort('-position');
    }

    // panigation
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const jobs = await result;

    const totalJobs = await Job.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalJobs / limit);
    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs,
        numOfPages,
    });
};
const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaulStats = {
        pending: stats.pending || 0,
        declined: stats.declined || 0,
        interview: stats.interview || 0,
    };
    let monthApplycation = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    monthApplycation = monthApplycation
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = moment()
                .month(month - 1)
                .year(year)
                .format('MMM Y');
            return { count, date };
        })
        .reverse();
    res.status(StatusCodes.OK).json({ defaulStats, monthApplycation });
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
