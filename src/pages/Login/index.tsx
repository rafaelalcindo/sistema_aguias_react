import React, { useContext, useState } from 'react';

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";

import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import { Context } from '../../context/AuthContext';
import styles from './styles.module.scss';
// import { useForm } from 'react-hook-form'


export function Login() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface IFormInputs {
        login: string;
        password: string;
    }

    const schema = yup.object().shape({
        login: yup.string().required("Login é obrigatório"),
        password: yup.string().required("Senha é obrigatório")
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const { handleLogin } = useContext(Context);

    async function login(data: IFormInputs) {
        console.log(data);
        setIsLoading(true);
        await handleLogin(data);
        await setIsLoading(false);
    }

    return (
        <>
            <div className="">
                <div className="flex flex-row">
                    <div className={`${styles.loginScreen} flex flex-col justify-center items-center w-2/6 bg-darkBlue h-screen`}>
                        <div className='w-9/12'>
                            <div className='imagem flex justify-center' >
                                <img
                                    className="h-56 w-auto "
                                    src={aguias}
                                    alt="bureau logo"
                                />
                            </div>

                            <form
                                id='loginForm'
                                className='space-y-6'
                                method='POST'
                                onSubmit={handleSubmit(login)}
                            >


                                <div className="filds flex flex-col">
                                    <label className='block text-2xl font-medium text-slate-100 ' htmlFor="login">Login:</label>
                                    <input
                                        {...register("login")}
                                        type="text"
                                        name="login"
                                        id="login"
                                        placeholder='Login'
                                        className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg  h-12 pl-4"
                                    />
                                    {errors.login && (
                                        <span className='text-mainDarkRed' >
                                            {errors.login.message}
                                        </span>
                                    )}
                                </div>

                                <div className="filds flex flex-col">
                                    <label className='block text-2xl font-medium text-slate-100 ' htmlFor="login">Senha:</label>
                                    <input
                                        {...register("password")}
                                        type="password"
                                        name="password"
                                        id="senha"
                                        placeholder='senha'
                                        className="mt-1 block w-full text-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg h-12 pl-4"
                                    />
                                    {errors.password && (
                                        <span className='text-mainDarkRed'>
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="filds flex flex-col mt-10">
                                    {
                                        isLoading ? (
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12">
                                                <FaSpinner
                                                    className="animate-spin mx-auto"
                                                    size={18}
                                                />
                                            </button>
                                        ) : (
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12">
                                                Entrar
                                            </button>
                                        )
                                    }

                                </div>

                            </form>

                        </div>
                    </div>

                    <div className={`${styles.backGroundScreem} flex flex-col w-4/6 bg-middleBlue h-screen`}>
                        <img
                            className="h-full w-auto opacity-60"
                            src={fotoTodos}
                            alt="fotoGeral"
                        />
                    </div>

                </div>
            </div >
        </>
    );
}