import React, { useState, useContext, useCallback, useEffect } from 'react';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';
import { EventoProps } from '../../types/EventoProps';
import { ListaProps } from '../../types/ListaProps';

import { EventoTable } from '../../components/TableList/EventoTable';
import { EventoFilter } from '../../components/Filters/EventoFilter';

interface listagemProps extends ListaProps {
    list: EventoProps[];
}

export function Eventos() {
    const [eventoList, setEventoList] = useState<EventoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');

    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    const { handleLogOut, usuario } = useContext(Context);

    const getEventos = useCallback(async (orderString?: string, filterString?: string) => {
        setEventoList([]);

        try {
            const { data } = await api.get<listagemProps>(`/evento?page=${page}${orderString}${filterString}`)

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setEventoList(data.list);
            setIsLoading(true);
        } catch {
            handleLogOut();
        }
    }, [page, orderString, filterString]);

    useEffect(() => {
        getEventos(orderString, filterString);
    }, [page, orderString, filterString]);

    return (
        <Menubar>
            <div className={`container mx-auto`}>

                <EventoFilter
                    setFilterString={setFilterString}
                />

                <EventoTable
                    title='Eventos'
                    list={eventoList}
                    getEvento={() => getEventos()}
                    setOrderString={setOrderString}
                />

                <br />

                <Pagination
                    initPage={1}
                    totalPage={lastPage}
                    page={page}
                    setPage={setPage}
                    path={`evento`}
                />

            </div>
        </Menubar>
    );
}