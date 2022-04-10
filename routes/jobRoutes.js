import express from 'express';
const router = express.Router();

import {
    createJob,
    deleteJob,
    getAllJobs,
    showStats,
    updateJob,
} from '../controllers/jobsController.js';

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route('/').post(createJob).get(getAllJobs);

// use :id for update
router.get('/stats', showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
