const register = (req, res) => {
    res.send('Register update');
};
const login = (req, res) => {
    res.send('Login');
};
const updateUser = (req, res) => {
    res.send('Update User');
};

export { register, login, updateUser };
