import React, { useState } from 'react';

import * as yup from 'yup';
import { Menubar } from '../../components/Menubar';
import styles from './styles.module.scss';
import { UsuarioTable } from '../../components/TableList/UsuarioTable';

export function Usuarios() {

    return (
        <>
            <Menubar>
                <div className={`container mx-auto`}>

                    {/* Filtro */}
                    <div className="flex flex-row-reverse mt-8">

                        <button
                            type="submit"
                            className={`mt-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12`}>
                            Filtro
                        </button>

                        <div className={`${styles.divFields} filds`} >

                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder='search'
                                className={`${styles.filtroInput} mt-1 block w-full text-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg h-12 pl-4`}
                            />
                        </div>
                    </div>


                    <UsuarioTable
                        title='Usuarios Table'
                    />

                </div>
            </Menubar>
        </>
    );
}