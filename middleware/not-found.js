const notFoundMiddleware = (req, res, next) => {
    return res.status(404).send('Routes does not Exist!!');
};

export default notFoundMiddleware;
