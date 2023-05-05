import React, { useCallback, useContext, useEffect, useState } from 'react';

import api from '../../../services/api';

import { UsuarioProps } from '../../../types/Usuario';
import { ListaProps } from '../../../types/ListaProps';

import styles from './styles.module.scss';
import { Context } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { object } from 'yup';


interface CheckListSelectEventos {
    eventoId?: number;
}

interface listagemUsuarioProps extends ListaProps {
    list: UsuarioProps[];
}

export function CheckListSelectEventos(
    {
        eventoId
    }: CheckListSelectEventos
) {

    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuariosRecebePontos, setUsuariosRecebePontos] = useState<UsuarioProps[]>([]);
    const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>([]);


    const { handleLogOut, usuario } = useContext(Context);

    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<listagemUsuarioProps>(`/usuario?ativo=${1}`);

            setUsuarios(data.list);
        } catch {
            handleLogOut();
        }
    }, []);

    useEffect(() => {

        getUsuarios();

    }, [eventoId]);

    /**
     * Serve para deixar todos os Checks falsos após a confirmação
     */
    function checkAllFalse() {
        var inputs = document.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == 'checkbox') {
                inputs[i].checked = false;
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            let newArray = [
                ...selectedUsuarios,
                value
            ];

            setSelectedUsuarios(
                [
                    ... new Set(newArray)
                ]
            );
        } else {
            if (selectedUsuarios.length > 0) {
                let newArray = selectedUsuarios.filter((register) => {
                    if (register != value)
                        return register;
                });

                setSelectedUsuarios(
                    newArray
                );
            }

        }

        // console.log(value, checked);
    }

    async function passSelectedToPointSide() {
        let objectToSet = [] as UsuarioProps[];
        let newUsuarioList = [] as UsuarioProps[];

        if (selectedUsuarios.length > 0) {
            objectToSet = usuarios.filter((register) => {
                let filterResu = selectedUsuarios.filter((selected) => {
                    if (selected == register.id)
                        return register;
                });

                return (filterResu.length > 0);
            });

            newUsuarioList = usuarios.filter((register) => {
                if (!objectToSet.includes(register))
                    return register;
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, selecione pelo menos 1 desbravador',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        let newArraySelected = [
            ...usuariosRecebePontos,
            ...objectToSet
        ];

        setUsuariosRecebePontos(
            [
                ... new Set(newArraySelected)
            ]
        );

        setUsuarios(newUsuarioList);

        checkAllFalse();

    }

    return (
        <div>
            <div className='flex flex-row flex-wrap  w-full'>
                <div className={`${styles.col_list} shadow-lg shadow-indigo-500/40`}>

                    {
                        usuarios ?
                            usuarios.map((item, index) => (
                                <div className={`${styles.inputGroup}`} key={index} >
                                    <input id={`option${item.id}`} name={`option${item.id}`} value={item.id} type="checkbox" onChange={handleChange} />
                                    <label htmlFor={`option${item.id}`}>{item.nome} {item.sobrenome}</label>
                                </div>
                            ))
                            :
                            ''
                    }

                    {/* <div className={`${styles.inputGroup}`}>
                    <input id="option2" name="option2" type="checkbox" />
                    <label htmlFor="option2">Option One</label>
                </div> */}
                </div>

                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <div className={`${styles.col_list} shadow-lg shadow-indigo-500/40`}>
                    {
                        usuariosRecebePontos ?
                            usuariosRecebePontos.map((item, index) => (
                                <div className={`${styles.inputGroup}`} key={index} >
                                    <input id={`optionSelected${item.id}`} name={`optionSelected${item.id}`} value={item.id} type="checkbox" onChange={handleChange} />
                                    <label className='CheckboxListSelectd' htmlFor={`optionSelected${item.id}`}>{item.nome} {item.sobrenome}</label>
                                </div>
                            ))
                            :
                            ''
                    }
                </div>

            </div>

            <div className="mt-4 flex flex-row justify-between w-full">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={passSelectedToPointSide}
                >
                    adicionar
                </button>

                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"

                >
                    Remover
                </button>
            </div>
        </div>
    );
}