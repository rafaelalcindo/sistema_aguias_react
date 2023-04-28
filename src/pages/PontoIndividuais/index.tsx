import React, { useState, useContext, useCallback, useEffect } from 'react';

import api from '../../services/api';
import { Context } from '../../context/AuthContext';
import { Menubar } from '../../components/Menubar';
import { Pagination } from '../../components/Pagination';
import { UsuarioPontoProps } from '../../types/UsuarioPonto';
import { ListaProps } from '../../types/ListaProps';

import { PontoIndividualTable } from '../../components/TableList/PontoIndividualTable';
import { PontoUsuarioFilter } from '../../components/Filters/PontoUsuarioFilter';

interface listagemProps extends ListaProps {
    list: UsuarioPontoProps[];
}

export function PontoIndividuais() {

    const [usuarioPontoList, setUsuarioPontoList] = useState<UsuarioPontoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const [orderString, setOrderString] = useState('');
    const [filterString, setFilterString] = useState('');

    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [totalRegister, setTotalRegister] = useState(1);

    // Context
    const { handleLogOut, usuario } = useContext(Context);

    const getPontoUsuario = useCallback(async (orderString?: string, filterString?: string) => {
        setUsuarioPontoList([]);
        try {
            const { data } = await api.get<listagemProps>(`/pontoindividual?page=${page}${orderString}${filterString}`);

            setPage(Number(data.currentPage));
            setLastPage(data.lastPage);
            setTotalRegister(data.totalRegister);
            setUsuarioPontoList(data.list);
            setIsLoading(true);
        } catch {
            handleLogOut();
        }
    }, [page, orderString, filterString]);


    useEffect(() => {
        getPontoUsuario(orderString, filterString);
    }, [page, orderString, filterString]);

    return (
        <Menubar>
            <div className={`container mx-auto`}>

                <PontoUsuarioFilter
                    setFilterString={setFilterString}
                />

                <PontoIndividualTable
                    title='Ponto de Usuário'
                    list={usuarioPontoList}
                    getPontoIndividual={() => getPontoUsuario()}
                    setOrderString={setOrderString}
                />

                <br />

                <Pagination
                    initPage={1}
                    totalPage={lastPage}
                    page={page}
                    setPage={setPage}
                    path={`pontoindividual`}
                />

            </div>
        </Menubar>
    );

}