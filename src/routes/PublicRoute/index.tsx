import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';

const PublicRoute = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
);

export default PublicRoute;