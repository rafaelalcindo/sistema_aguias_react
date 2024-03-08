import React, { useState, Fragment } from 'react';
import Swal from "sweetalert2";
import { HiTrash, HiPencil, HiArrowDown, HiArrowUp } from "react-icons/hi";

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

import api from '../../../services/api';
import { UnidadeProps } from '../../../types/Unidade';
import history from '../../../services/history';

import styles from '../styles.module.scss';

type UnidadeTable = {
    title: string;
    list?: UnidadeProps[];
    getUnidades: () => Promise<void>;
    setOrderString: (order: string) => void;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export function UnidadeTable({
    title,
    list,
    getUnidades,
    setOrderString
}: UnidadeTable) {

    const [orderName, setOrderName] = useState('');
    const [orderDirection, setOrderDirection] = useState('');

    async function organizeDirection(orderName: string) {

        let orderFlow = '';

        if (orderDirection == '') {
            setOrderDirection('DESC');
            orderFlow = 'DESC';
        } else if (orderDirection == 'DESC') {
            setOrderDirection('ASC');
            orderFlow = 'ASC';
        } else {
            setOrderDirection('');
            orderFlow = '';
        }

        let buildOrder = `&orderName=${orderName}&orderDirection=${orderFlow}`;

        setOrderString(buildOrder);
        setOrderName(orderName);

    }

    function arrowDirection(orderNameParam: string) {

        let arrowDirection;

        if (orderName == orderNameParam) {
            if (orderDirection == 'DESC') {
                arrowDirection = <HiArrowUp />;
            } else if (orderDirection == 'ASC') {
                arrowDirection = <HiArrowDown />;
            } else {
                arrowDirection = '';
            }
        }

        return (
            <div>
                {arrowDirection}
            </div>
        );
    }


    async function removeUnidade(id: number) {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Deseja deletar a unidade?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(async (result) => {

            if (result.isConfirmed) {
                await api.delete(`unidade/delete/${id}`);
                Swal.fire(
                    'Deletado',
                    'A unidade foi removida com sucesso!.',
                    'success'
                )
                getUnidades();
            }
        })
    }

    return (
        <div className="w-full">
            <div className="p-2 flex items-center justify-center body">
                <div className="container">
                    <div className="flex flex-row justify-between text-2xl py-4 px-4 ">
                        <div className="nameTable">
                            <h2 className={`text-neutral-700`} > {title}</h2>
                        </div>
                        <div className={`buttonAdd`}>
                            <Link to={"/unidades/add"} className={`text-blue-900`} > Adicionar </Link>
                        </div>

                    </div>
                    <table className="w-full  bg-lightWhite rounded-b-lg  sm:shadow-lg">
                        <thead >
                            <tr className={`flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-5 sm:mb-0 lg:mb-0 border-b-4 border-blue-950`}>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    <a
                                        onClick={() => organizeDirection('nome')}
                                        className={`flex flex-row ${styles.titleCol}`}
                                    >
                                        Unidade &nbsp;
                                        {arrowDirection('nome')}

                                    </a>
                                </th>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    <a
                                        onClick={() => organizeDirection('equipamentos')}
                                        className={`flex flex-row ${styles.titleCol}`}
                                    >
                                        Equipamentos &nbsp;
                                        {arrowDirection('equipamentos')}
                                    </a>
                                </th>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    Ação
                                </th>
                            </tr>
                        </thead>

                        <tbody >
                            {
                                list &&
                                list.map((item, index) => (
                                    <tr key={index} className={`flex flex-col flex-no wrap lg:table-row mb-5 sm:mb-0 line ${styles.lineRow}`}>
                                        <td className="p-3 h-1/6 text-xs sm:text-base">

                                            {item.nome}
                                        </td>

                                        <td className="p-3 h-1/6 text-xs sm:text-base">

                                            {item.equipamentos}

                                        </td>

                                        <td className="flex justify-center p-3 h-1/6 text-xs sm:text-base">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                        Opções
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => history.push(`/unidades/edit/${item.id}`)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        <span className='flex flex-row text-green-600' > <HiPencil className='mt-1' /> &nbsp; Editar </span>
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => removeUnidade(item.id)}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        <span className='flex flex-row text-red-600'> <HiTrash className='mt-1 ' /> &nbsp; Deletar</span>
                                                                    </a>
                                                                )}
                                                            </Menu.Item>


                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
}