import { useContext } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import { Context } from "../context/AuthContext";
import history from "../services/history";
import PublicRoute from './PublicRoute';

const Routes = () => {
    const { authenticated } = useContext(Context);

    if (authenticated) {
        return (
            <>
                <h2>Entrou</h2>
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