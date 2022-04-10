import { StatusCodes } from 'http-status-codes';
import CustomAPI from './custom-api.js';

class BadRequest extends CustomAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequest;
