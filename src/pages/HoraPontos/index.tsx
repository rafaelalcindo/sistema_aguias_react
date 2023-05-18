import React, { useState, useContext, useCallback, useEffect, Fragment } from 'react';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';
import { HoraPontoProps } from '../../types/HoraPontoProps';
import { ListaProps } from '../../types/ListaProps';
import { HoraPontoTable } from '../../components/TableList/HoraPontoTable';
import { HoraPontoFilter } from '../../components/Filters/HoraPontoFilter';

interface listagemProps extends ListaProps {
    list: HoraPontoProps[];
}

export function HoraPontos() {
    const [horaPontoList, setHoraPontoList] = useState<HoraPontoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');

    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    const { handleLogOut, usuario } = useContext(Context);

    const getHoraPontos = useCallback(async (orderString?: string, filterString?: string) => {
        setHoraPontoList([]);

        try {
            const { data } = await api.get<listagemProps>(`/horaponto?page=${page}${orderString}${filterString}`)

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setHoraPontoList(data.list);
            setIsLoading(true);
        } catch {
            handleLogOut();
        }

    }, [page, orderString, filterString]);

    useEffect(() => {
        getHoraPontos(orderString, filterString);
    }, [page, orderString, filterString]);

    return (
        <Menubar>
            <div className={`container mx-auto`}>

                <HoraPontoFilter
                    setFilterString={setFilterString}
                />

                <HoraPontoTable
                    title='Horas de chegada'
                    list={horaPontoList}
                    getHoraPonto={() => getHoraPontos()}
                    setOrderString={setOrderString}
                />

                <Pagination
                    initPage={1}
                    totalPage={lastPage}
                    page={page}
                    setPage={setPage}
                    path={`horaPonto`}
                />
            </div>
        </Menubar>
    )
}
