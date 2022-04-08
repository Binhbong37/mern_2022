import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Landing, Register, Dashboard, Error } from './pages';

const App = () => {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/register">Register</Link>
                <Link to="/landing">Landing</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
