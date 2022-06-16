const authenticateUser = (req, res, next) => {
    console.log('Authenticated User');
    next();
};

export { authenticateUser };
