import React, { useState, Fragment } from 'react';
import Swal from "sweetalert2";
import { HiTrash, HiPencil, HiArrowDown, HiArrowUp } from "react-icons/hi";

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

import api from '../../../services/api';
import { UsuarioPontoProps } from '../../../types/UsuarioPonto';
import history from '../../../services/history';
import { transformDateWithoutTime } from '../../../services/utils/convertDate';

import styles from '../styles.module.scss';
import { DesbravadorHoraPontoProps } from '../../../types/DesbravadorHoraPontoProps';

type HoraPontoIndividualTable = {
    title: string;
    list?: DesbravadorHoraPontoProps[];
    // getHoraPontoIndividual: () => Promise<void>;
    // setOrderString: (order: string) => void;
}

export function HoraPontoIndividualTable(
    {
        title,
        list,
        // getHoraPontoIndividual,
        // setOrderString
    }: HoraPontoIndividualTable
) {
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

        // setOrderString(buildOrder);
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

    return (
        <div className='w-full' >
            <table className="w-full  bg-lightWhite rounded-b-lg  sm:shadow-lg">
                <thead>
                    <tr className={`flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-5 sm:mb-0 lg:mb-0 border-b-4 border-blue-950`}>
                        <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                            <a
                                onClick={() => organizeDirection('usuario_id')}
                                className={`flex flex-row ${styles.titleCol}`}
                            >
                                Desbravador &nbsp;
                                {arrowDirection('usuario_id')}

                            </a>
                        </th>

                        <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                            <a
                                onClick={() => organizeDirection('data_chegada')}
                                className={`flex flex-row ${styles.titleCol}`}
                            >
                                Data &nbsp;
                                {arrowDirection('data_chegada')}

                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list &&
                        list.map((item, index) => (
                            <tr key={index} className={`flex flex-col flex-no wrap lg:table-row mb-5 sm:mb-0 line ${styles.lineRow}`}>
                                <td className="">
                                    <p className='p-2 text-xs' >{item.usuario?.nome} {item.usuario?.sobrenome}</p>
                                </td>

                                <td className="">
                                    <p className='p-2 text-xs' >
                                        {transformDateWithoutTime(item.data_chegada)}&nbsp;
                                        {item.hora_chegada}
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}