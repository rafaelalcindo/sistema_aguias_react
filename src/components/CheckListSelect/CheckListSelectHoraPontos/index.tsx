import React, { useCallback, useContext, useEffect, useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment';

import api from '../../../services/api';

import { HoraPontoProps } from '../../../types/HoraPontoProps';
import { DesbravadorHoraPontoProps } from '../../../types/DesbravadorHoraPontoProps';
import { ListaProps } from '../../../types/ListaProps';

import styles from './styles.module.scss';
import { Context } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { object } from 'yup';
import { UsuarioProps } from '../../../types/Usuario';
import { HoraPontoIndividualTable } from '../../TableList/HoraPontoIndividualTable';

interface CheckListSelectHoraPonto {
    horaPontoId?: number;
}

interface listagemUsuarioProps extends ListaProps {
    list: UsuarioProps[];
}

interface listagemDbvHoraPontoProps extends ListaProps {
    list: DesbravadorHoraPontoProps[];
}

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

export function CheckListSelectHoraPontos(
    {
        horaPontoId
    }: CheckListSelectHoraPonto
) {
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuariosReceberamPontos, setUsuariosReceberamPontos] = useState<UsuarioProps[]>([]);
    const [dbvHoraPontos, setDbvHoraPontos] = useState<DesbravadorHoraPontoProps[]>([]);

    const { handleLogOut, usuario } = useContext(Context);

    const [selected, setSelected] = useState<UsuarioProps>();
    const [query, setQuery] = useState('');


    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    // Puxar Dados
    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<listagemUsuarioProps>(`/usuario?ativo=${1}`);
            const responseDbvHoraPonto = await api.get<listagemDbvHoraPontoProps>(`/desbravadorhoraponto?hora_ponto_id=${horaPontoId}`);

            let usuarioList = data.list;
            let dbvHoraPonto = responseDbvHoraPonto.data.list;

            const usuarioAtuais = usuarioList.filter(usuario => {
                let filterResu = dbvHoraPonto.find(dbvHora => ((Number(dbvHora.usuario?.id) == Number(usuario.id)) ? true : false));

                return (filterResu == undefined);
            });

            setDbvHoraPontos(responseDbvHoraPonto.data.list);
            setUsuarios(usuarioAtuais);
        } catch {
            handleLogOut();
        }
    }, []);


    useEffect(() => {
        getUsuarios();
    }, [horaPontoId]);

    async function adicionarDesbravador(usuarioSelected?: UsuarioProps, horaPontoId?: number) {

        const data_chegada = moment().format('YYYY-MM-DD HH:mm:ss');

        const dataInsert = {
            usuario_id: usuarioSelected?.id,
            hora_ponto_id: horaPontoId,
            data_chegada: data_chegada
        }

        const resuAddData = await api.post(`/desbravadorhoraponto/adicionarhoraponto`, dataInsert);

        if (resuAddData.data.status === "Error") {
            Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema',
                text: 'Não conseguimos realizar a ação de adicionar hora e data'
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Data e a Hora foram adicionadas',
                text: 'A data e a hora foi adicionada com sucesso!'
            });

            getUsuarios();
        }
    }

    return (
        <div>
            <div className="fixed top-16 w-full flex flex-row">
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(person: any) => person ? person.nome + ' ' + person.sobrenome : ''}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {usuarios.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    usuarios.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.nome} {person.sobrenome}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>

                &nbsp;&nbsp;

                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => adicionarDesbravador(selected, horaPontoId)}
                >
                    add
                </button>
            </div>

            <div className=" w-full mt-20 flex flex-column overflow-y-scroll">
                <HoraPontoIndividualTable
                    title='Lista de adicionados'
                    list={dbvHoraPontos}
                />
            </div>
        </div>
    );
}
