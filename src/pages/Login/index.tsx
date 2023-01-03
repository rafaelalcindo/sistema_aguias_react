import React from 'react';

import * as yup from 'yup';
import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import styles from './styles.module.scss';
// import { useForm } from 'react-hook-form'


export function Login() {
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

                            <div className="filds flex flex-col">
                                <label className='block text-2xl font-medium text-slate-100 ' htmlFor="login">Login:</label>
                                <input
                                    type="text"
                                    name="login"
                                    id="login"
                                    placeholder='Login'
                                    className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg  h-12 pl-4"
                                />
                            </div>

                            <div className="filds flex flex-col">
                                <label className='block text-2xl font-medium text-slate-100 ' htmlFor="login">Senha:</label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    placeholder='senha'
                                    className="mt-1 block w-full text-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg h-12 pl-4"
                                />
                            </div>

                            <div className="filds flex flex-col mt-10">
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12">
                                    Entrar
                                </button>
                            </div>

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