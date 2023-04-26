import { useContext } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import { Context } from "../context/AuthContext";
import history from "../services/history";
import PublicRoute from './PublicRoute';
import AuthenticatedRoute from './AuthenticatedRoute';

const Routes = () => {
    const { authenticated } = useContext(Context);

    if (authenticated) {
        return (
            <>
                <BrowserRouter>
                    <AuthenticatedRoute />
                </BrowserRouter>
            </>
        )
    }

    return (
        <BrowserRouter>
            <PublicRoute />
        </BrowserRouter>
    );
};

export default Routes;