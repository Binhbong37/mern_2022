import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/authController.js';

// router.route('/register').get(register);
router.post('/register', register);
// router.route('/login').get(login);
router.post('/login', login);
// router.route('/updateUser').patch(updateUser);
router.patch('/updateUser', updateUser);

export default router;
