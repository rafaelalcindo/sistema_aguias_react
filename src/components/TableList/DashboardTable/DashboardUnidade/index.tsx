import React, { useState, Fragment } from 'react';
import Swal from "sweetalert2";
import { HiTrash, HiPencil, HiArrowDown, HiArrowUp, HiPlus } from "react-icons/hi";

import styles from '../../styles.module.scss';

type DashboardCircleProps = {
    nome: string;
    pontos: number;
}

type DashboardUnidadeTable = {
    title: string;
    list?: DashboardCircleProps[];
}

export function DashboardUnidade(
    {
        title,
        list
    }: DashboardUnidadeTable
) {
    return (
        <div className='w-full' >
            <table className="w-full  bg-lightWhite rounded-b-lg  sm:shadow-lg">
                <thead>
                    <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                        Nome
                    </th>

                    <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                        Pontos
                    </th>
                </thead>
                <tbody>
                    {
                        list &&
                        list.map((item, index) => (
                            <tr key={index} className={`flex flex-col flex-no wrap lg:table-row mb-5 sm:mb-0 line ${styles.lineRow}`} >
                                <td className="p-3 h-1/6 text-xs sm:text-base">
                                    {item.nome}
                                </td>

                                <td className="p-3 h-1/6 text-xs sm:text-base">
                                    {item.pontos}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}