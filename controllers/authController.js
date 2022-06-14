import { StatusCodes } from 'http-status-codes';

import { BadRequest, UnAuthenticated } from '../errors/index.js';
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
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location,
        },
        token,
        location: user.location,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest('Plz fill all input');
    }
    // check exist user
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticated('user is not exist');
    }
    // check isMatch pass
    const isPass = await user.comparePass(password);
    if (!isPass) {
        throw new UnAuthenticated('pass is not matches');
    }

    // PASS het cung tao token
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = (req, res) => {
    res.send('Update User');
};

export { register, login, updateUser };
