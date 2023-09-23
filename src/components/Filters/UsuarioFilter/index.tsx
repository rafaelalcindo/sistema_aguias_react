import React, { useState } from 'react';

import styles from '../styles.module.scss';

type UsuarioFilterProps = {
    setFilterString: (order: string) => void;
}

export function UsuarioFilter({
    setFilterString
}: UsuarioFilterProps) {

    const [search, setSearch] = useState('');

    function filterFields() {

        let filterBuilder = '';
        if (search != '' && search != null) {
            filterBuilder += `&search=${search}`;
        }

        setFilterString(filterBuilder);
    }

    return (
        <div className="flex flex-row-reverse mt-8">
            <div className="flex flex-row-reverse mt-8">

                <button
                    type="submit"
                    onClick={() => filterFields()}
                    className={`mt-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-12`}>
                    Filtro
                </button>

                <div className={`${styles.divFields} filds`} >

                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='search'
                        className={`${styles.filtroInput} mt-1 block w-full text-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg h-12 pl-4`}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

        </div>
    );
}