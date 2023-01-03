import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../services/api";
import history from "../services/history";

import { UsuarioProps } from "../types/Usuario";

type LoginData = {
    login: string;
    password: string;
}

type AuthProps = {
    authenticated: boolean;
    handleLogin: (data: LoginData) => Promise<void>;
    loading: boolean;
    handleLogOut: () => void;
    usuario: UsuarioProps | null,
    isActiveLogin: boolean;
    setIsActiveLogin: (state: boolean) => void;
}

const DEFAULT_VALUE = {
    authenticated: false,
    handleLogin: async () => { },
    loading: true,
    handleLogOut: () => { },
    usuario: null,
    isActiveLogin: false,
    setIsActiveLogin: () => { },
}

const Context = createContext<AuthProps>(DEFAULT_VALUE);

const AuthProvider = ({ children }: any) => {
    const [authenticated, setAuthenticated] = useState(
        DEFAULT_VALUE.authenticated
    );
    const [loading, setLoading] = useState(DEFAULT_VALUE.loading);
    const [usuario, setUsuario] = useState(DEFAULT_VALUE.usuario);
    const [isActiveLogin, setIsActiveLogin] = useState(
        DEFAULT_VALUE.isActiveLogin
    );

    useEffect(() => {
        const token = localStorage.getItem('SistemaAguias@token');
        const usuario = localStorage.getItem('SistemaAguias@usuario');

        if (token && usuario) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
                token
            )}`;

            setUsuario(JSON.parse(usuario));
            setAuthenticated(true);
            setLoading(false);
        } else {
            localStorage.removeItem('SistemaAguias@token');
            localStorage.removeItem('SistemaAguias@usuario');
        }
    }, []);

    async function handleLogin({ login, password }: LoginData) {
        try {
            const dataLogin = {
                login: login,
                password: password
            };
            const {
                data: { token, usuario }
            } = await api.post(`session/loginusuario`, dataLogin).catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Tivemos um problema ao logar',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                throw err.response.status;
            });
            localStorage.setItem("SistemaAguias@token", JSON.stringify(token));
            localStorage.setItem("SistemaAguias@usuario", JSON.stringify(usuario));
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            history.push('/');
            setUsuario(usuario);
            setAuthenticated(true);

        } catch { }
    }

    function handleLogOut() {
        localStorage.removeItem('SistemaAguias@token');
        localStorage.removeItem('SistemaAguias@usuario');

        api.defaults.headers.common["Authorization"] = "";

        setAuthenticated(false);
        history.push('/');
    }

    return (
        <Context.Provider
            value={{
                authenticated,
                handleLogin,
                loading,
                handleLogOut,
                usuario,
                isActiveLogin,
                setIsActiveLogin
            }}
        >
            {children}

        </Context.Provider>
    );
};

export { Context, AuthProvider };