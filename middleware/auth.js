import jwt from 'jsonwebtoken';

import { UnAuthenticated } from '../errors/index.js';

const authenticateUser = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        throw new UnAuthenticated('Authenticated Invalid!');
    }
    const token = authHeaders.split(' ')[1];
    try {
        const payload = jwt.verify(token, 'jwtsecrete');
        req.user = { userId: payload.userId };
        next();
    } catch (err) {
        throw new UnAuthenticated('Authenticated Invalid!');
    }
};

export { authenticateUser };
