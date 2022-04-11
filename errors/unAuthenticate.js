import { StatusCodes } from 'http-status-codes';
import CustomAPI from './custom-api.js';

class UnAuthenticated extends CustomAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthenticated;
