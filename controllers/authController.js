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
const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
        throw new UnAuthenticated('Plz fill all input');
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
    await user.save();
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
