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
import { UsuarioFilter } from '../../components/Filters/UsuarioFilter';

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
                    <UsuarioFilter
                        setFilterString={setFilterString}
                    />


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