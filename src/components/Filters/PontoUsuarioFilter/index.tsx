import React, { useCallback, useEffect, useState } from 'react';

import api from '../../../services/api';
import { ListaProps } from '../../../types/ListaProps';
import { UsuarioProps } from '../../../types/Usuario';

import styles from '../styles.module.scss';

type UsuarioFilterProps = {
    setFilterString: (order: string) => void;
}

interface listagemProps extends ListaProps {
    list: UsuarioProps[];
}

export function PontoUsuarioFilter({
    setFilterString
}: UsuarioFilterProps) {

    const [search, setSearch] = useState('');
    const [usuario, setUsuario] = useState('');
    const [usuarioList, setUsuarioList] = useState<UsuarioProps[]>([]);

    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<listagemProps>(`/usuario?ativo=${1}`);
            console.log(data)
            setUsuarioList(data.list);
        } catch {
            console.log('deu erro');
        }
    }, []);

    useEffect(() => {
        getUsuarios();
    }, []);

    function filterFields() {
        let filterBuilder = '';

        if (search != '' && search != null) {
            filterBuilder += `&search=${search}`;
        }

        if (usuario != '' && usuario != null) {
            filterBuilder += `&usuario_id=${usuario}`;
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
                    htmlFor="usuarios"
                    className="block text-sm font-medium text-gray-700"
                >
                    Desbravadores
                </label>

                <select
                    name="usuarios"
                    id='usuarios'
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm h-12"
                    onChange={(e) => setUsuario(e.target.value)}
                >
                    <option value='' >-- Selecione --</option>

                    {
                        usuarioList ?
                            usuarioList.map(usuario => (
                                <option key={usuario.id} value={usuario.id} >{usuario.nome} {usuario.sobrenome}</option>
                            ))
                            :
                            ''
                    }

                </select>
            </div>

        </div>
    );

}