import React, { useState, useContext, useCallback, useEffect } from 'react';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';
import { UnidadePontoProps } from '../../types/UnidadePonto';
import { ListaProps } from '../../types/ListaProps';

import { PontoUnidadeTable } from '../../components/TableList/PontoUnidadeTable';

import styles from './styles.module.scss';
import { PontoUnidadeFilter } from '../../components/Filters/PontoUnidadeFilter';

interface listagemProps extends ListaProps {
    list: UnidadePontoProps[];
}

export function PontoUnidades() {

    const [unidadePontoList, setUnidadePontoList] = useState<UnidadePontoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');

    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    // Context
    const { handleLogOut, usuario } = useContext(Context);

    const getPontoUnidades = useCallback(async (orderString?: string, filterString?: string) => {
        setUnidadePontoList([]);
        try {
            const { data } = await api.get<listagemProps>(`/pontounidade?page=${page}${orderString}${filterString}`);

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setUnidadePontoList(data.list);
            setIsLoading(true);
        } catch {
            handleLogOut();
        }
    }, [page, orderString, filterString]);


    useEffect(() => {
        getPontoUnidades(orderString, filterString);
    }, [page, orderString, filterString]);

    return (
        <Menubar>
            <div className={`container mx-auto`}>

                <PontoUnidadeFilter
                    setFilterString={setFilterString}
                />

                <PontoUnidadeTable
                    title='Ponto de Unidade'
                    list={unidadePontoList}
                    getPontoUnidade={() => getPontoUnidades()}
                    setOrderString={setOrderString}
                />

                <br />

                <Pagination
                    initPage={1}
                    totalPage={lastPage}
                    page={page}
                    setPage={setPage}
                    path={`pontounidades`}

                />

            </div>
        </Menubar>
    );
}