import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Register, Error, ProtectRoutes } from './pages';
import { AddJob, Profile, Stats, AllJob, ShareLayout } from './pages/dashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectRoutes>
                            <ShareLayout />
                        </ProtectRoutes>
                    }
                >
                    <Route index element={<Stats />} />
                    <Route path="all-jobs" element={<AllJob />} />
                    <Route path="add-job" element={<AddJob />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
