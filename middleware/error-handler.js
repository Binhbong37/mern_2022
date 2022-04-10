import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defautlError = {
        StatusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try it later!!',
    };
    if (err.name === 'ValidationError') {
        defautlError.StatusCodes = StatusCodes.BAD_REQUEST;
        defautlError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
    }
    if (err.code && err.code === 11000) {
        const key = Object.keys(err.keyValue); // Nó trả về mảng sao ở key dưới lại ...
        defautlError.StatusCodes = StatusCodes.BAD_REQUEST;
        defautlError.msg = `${key} input has to be unique`;
    }
    res.status(defautlError.StatusCodes).json({ msg: defautlError.msg });
};

export default errorHandlerMiddleware;
