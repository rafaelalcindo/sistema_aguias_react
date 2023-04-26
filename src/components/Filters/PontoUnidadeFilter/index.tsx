import React, { useCallback, useEffect, useState } from 'react';


import api from '../../../services/api';
import { ListaProps } from '../../../types/ListaProps';
import { UnidadeProps } from '../../../types/Unidade';

import styles from './styles.module.scss';

type UnidadePontoFilterProps = {
    setFilterString: (order: string) => void;
}

interface listagemProps extends ListaProps {
    list: UnidadeProps[];
}

export function PontoUnidadeFilter({
    setFilterString
}: UnidadePontoFilterProps) {

    const [search, setSearch] = useState('');
    const [unidade, setUnidade] = useState('');
    const [unidadeList, setUnidadeList] = useState<UnidadeProps[]>([]);

    const getUnidades = useCallback(async () => {
        try {
            const { data } = await api.get<listagemProps>(`/unidade`);
            setUnidadeList(data.list);
        } catch {
            console.log('deu erro');
        }
    }, []);

    useEffect(() => {
        getUnidades();
    }, []);


    function filterFields() {
        let filterBuilder = '';

        if (search != '' && search != null) {
            filterBuilder += `&search=${search}`;
        }

        if (unidade != '' && unidade != null) {
            filterBuilder += `&unidade_id=${unidade}`;
        }

        setFilterString(filterBuilder);
    }

    return (
        <div className="flex flex-row-reverse mt-8">
            <button
                type="submit"
                onClick={() => filterFields()}
                className={`mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12`}
            >
                Filtro
            </button>

            <div className={`${styles.divFields} filds`} >
                <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700"
                >
                    Pesquisa:
                </label>

                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='search'
                    className={`${styles.filtroInput} mt-1 block w-full text-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg h-12 pl-4`}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>



            <div className={`${styles.divFields} filds`} >
                <label
                    htmlFor="unidades"
                    className="block text-sm font-medium text-gray-700"
                >
                    Unidades
                </label>

                <select
                    name="unidades"
                    id='unidades'
                    className="mt-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                    onChange={(e) => setUnidade(e.target.value)}
                >
                    <option value='' >-- Selecione --</option>

                    {
                        unidadeList ?
                            unidadeList.map(unidade => (
                                <option key={unidade.id} value={unidade.id} >{unidade.nome}</option>
                            ))
                            :
                            ''
                    }

                </select>
            </div>
        </div>
    );
}