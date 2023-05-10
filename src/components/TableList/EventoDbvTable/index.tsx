import React from 'react';

import { DesbravadorEventoProps } from '../../../types/DesbravadorEventoProps';
import { transformDateWithoutTime } from '../../../services/utils/convertDate';

import styles from '../styles.module.scss';

type EventoDbvTable = {
    list?: DesbravadorEventoProps[];
}

export function EventoDbvTable(
    {
        list
    }: EventoDbvTable
) {
    return (
        <div className='w-full' >
            <table className="w-full  bg-lightWhite rounded-b-lg  sm:shadow-lg">
                <thead>
                    <tr className={`flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-5 sm:mb-0 lg:mb-0 border-b-4 border-blue-950`}>
                        <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                            <a
                                className={`flex flex-row ${styles.titleCol}`}
                            >
                                Nome &nbsp;

                            </a>
                        </th>

                        <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                            <a
                                className={`flex flex-row ${styles.titleCol}`}
                            >
                                Data de inserção &nbsp;

                            </a>
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {
                        list &&
                        list.map((item, index) => (
                            <tr key={index} className={`flex flex-col flex-no wrap lg:table-row mb-5 sm:mb-0 line ${styles.lineRow}`}>
                                <td className="text-sm ">
                                    {item.usuario?.nome} {item.usuario?.sobrenome}
                                </td>
                                <td className="text-sm">
                                    {transformDateWithoutTime(item.created_at)}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}