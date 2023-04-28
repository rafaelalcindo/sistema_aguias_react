import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as yup from 'yup';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';
import { UnidadeTable } from '../../components/TableList/UnidadeTable';
import { UnidadeProps } from '../../types/Unidade';
import { ListaProps } from '../../types/ListaProps';

import styles from './styles.module.scss';
import { UnidadeFilter } from '../../components/Filters/UnidadeFilter';

interface listagemProps extends ListaProps {
    list: UnidadeProps[];
}


export function Unidades() {

    // States
    const [unidadeList, setUnidadeList] = useState<UnidadeProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');


    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    // Context
    const { handleLogOut, usuario } = useContext(Context);


    const getUnidades = useCallback(async (orderString?: string, filterString?: string) => {
        setUnidadeList([]);
        try {
            const { data } = await api.get<listagemProps>(`/unidade?page=${page}${orderString}${filterString}`);

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setUnidadeList(data.list);
            setIsLoading(true);

        } catch {
            handleLogOut();
        }

    }, [orderString]);

    useEffect(() => {

        getUnidades(orderString, filterString);
    }, [page, orderString, filterString]);

    return (
        <>
            <Menubar>
                <div className={`container mx-auto`}>
                    <UnidadeFilter
                        setFilterString={setFilterString}
                    />

                    <UnidadeTable
                        title='Unidades'
                        list={unidadeList}
                        getUnidades={() => getUnidades()}
                        setOrderString={setOrderString}
                    />

                    <br />

                    <Pagination
                        initPage={1}
                        totalPage={lastPage}
                        page={page}
                        setPage={setPage}
                        path={`unidade`}

                    />

                </div>
            </Menubar>
        </>
    );
}