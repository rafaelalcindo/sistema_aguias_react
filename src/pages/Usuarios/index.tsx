import React, { useCallback, useContext, useEffect, useState } from 'react';

import * as yup from 'yup';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';

import { UsuarioTable } from '../../components/TableList/UsuarioTable';
import { UsuarioProps } from '../../types/Usuario';

import styles from './styles.module.scss';
import { ListaProps } from '../../types/ListaProps';

interface listagemProps extends ListaProps {
    list: UsuarioProps[];
}

export function Usuarios() {

    // States
    const [usuarioList, setUsuarioList] = useState<UsuarioProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');

    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    // Context
    const { handleLogOut, usuario } = useContext(Context);

    const getUsuarios = useCallback(async (orderString?: string, filterString?: string) => {
        setUsuarioList([]);

        try {
            const { data } = await api.get<listagemProps>(`/usuario?page=${page}${orderString}${filterString}`);

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setUsuarioList(data.list);
            setIsLoading(true);

        } catch {
            handleLogOut();
        }

    }, [orderString]);

    useEffect(() => {
        getUsuarios(orderString, filterString);
    }, [page, orderString, filterString]);

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
                        title='Desbravadores'
                        list={usuarioList}
                        getUsuarios={() => getUsuarios()}
                        setOrderString={setOrderString}
                    />

                    <br />

                    <Pagination
                        initPage={1}
                        totalPage={lastPage}
                        page={page}
                        setPage={setPage}
                        path={`usuario`}

                    />

                </div>
            </Menubar>
        </>
    );
}