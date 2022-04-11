import { StatusCodes } from 'http-status-codes';

import { BadRequest } from '../errors/index.js';
import User from '../model/User.js';

const register = async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
        throw new BadRequest('Plz fill all input');
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        throw new BadRequest('User already exists, plz chooose another email');
    }
    const user = await User.create({ name, password, email });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            loctaion: user.loctaion,
        },
        token,
    });
};
const login = (req, res) => {
    res.send('Login');
};
const updateUser = (req, res) => {
    res.send('Update User');
};

export { register, login, updateUser };
