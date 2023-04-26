import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';
import { Usuarios } from '../../pages/Usuarios';
import { UsuarioAdd } from '../../pages/Usuarios/UsuarioAdd';


const PublicRoute = () => (
    <Routes>
        <Route path='/' element={<Login />} />

    </Routes>
);

export default PublicRoute;