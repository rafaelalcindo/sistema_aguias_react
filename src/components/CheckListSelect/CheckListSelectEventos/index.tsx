import React, { useCallback, useContext, useEffect, useState } from 'react';

import api from '../../../services/api';

import { UsuarioProps } from '../../../types/Usuario';
import { DesbravadorEventoProps } from '../../../types/DesbravadorEventoProps';
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

interface listagemDbvEventoProps extends ListaProps {
    list: DesbravadorEventoProps[];
}

export function CheckListSelectEventos(
    {
        eventoId
    }: CheckListSelectEventos
) {

    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuariosRecebePontos, setUsuariosRecebePontos] = useState<UsuarioProps[]>([]);
    const [dbvEventos, setDbvEventos] = useState<DesbravadorEventoProps[]>([]);

    const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>([]);
    const [selectedUsuariosRemove, setSelectedUsuariosRemove] = useState<string[]>([]);


    const { handleLogOut, usuario } = useContext(Context);

    // Puxar Dados
    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<listagemUsuarioProps>(`/usuario?ativo=${1}`);
            const responseDbvEvento = await api.get<listagemDbvEventoProps>(`/desbravadorevento?evento_id=${eventoId}`);

            let usuarioList = data.list;
            let dbvEventos = responseDbvEvento.data.list;

            const usuariosAtuais = usuarioList.filter(usuario => {
                let filterResu = dbvEventos.find(dbvEvento => ((Number(dbvEvento.usuario_id) == Number(usuario.id)) ? true : false));

                return (filterResu == undefined);
            });

            setDbvEventos(responseDbvEvento.data.list);
            setUsuarios(usuariosAtuais);
        } catch {
            handleLogOut();
        }
    }, []);

    useEffect(() => {

        getUsuarios();

    }, [eventoId]);

    // Salvar Dados

    async function pontuarDesbravadores() {

        if (usuariosRecebePontos.length > 0) {

            let usuarios_id = usuariosRecebePontos.map(usuario => usuario.id);

            const dataAdd = {
                evento_id: eventoId,
                usuarios_id
            }

            let response = await api.post('desbravadorevento/addmassa', dataAdd);

            if (response.data.result) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Desbravadores Adicionado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setUsuariosRecebePontos([]);
            }


        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, adicione pelo menos 1 desbravador',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        // console.log(eventoId);
        // console.log(usuariosRecebePontos);
    }

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

    const handleChangeRemove = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            let newArray = [
                ...selectedUsuariosRemove,
                value
            ];

            setSelectedUsuariosRemove(
                [
                    ... new Set(newArray)
                ]
            );
        } else {
            if (selectedUsuariosRemove.length > 0) {
                let newArray = selectedUsuariosRemove.filter((register) => {
                    if (register != value)
                        return register;
                });

                setSelectedUsuariosRemove(
                    [
                        ... new Set(newArray)
                    ]
                )
            }
        }
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

    async function passSelectedToPointSideRemove() {
        let objectToSet = [] as UsuarioProps[];
        let newUsuarioList = [] as UsuarioProps[];

        if (selectedUsuariosRemove.length > 0) {
            objectToSet = usuariosRecebePontos.filter((register) => {
                let filterResu = selectedUsuariosRemove.filter((selected) => {
                    if (selected == register.id)
                        return register;
                });

                return (filterResu.length > 0);
            });

            newUsuarioList = usuariosRecebePontos.filter((register) => {
                if (!objectToSet.includes(register))
                    return register;
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, selecione pelo menos 1 desbravador',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        let newArraySelected = [
            ...usuarios,
            ...objectToSet
        ];

        setUsuarios(
            [
                ... new Set(newArraySelected)
            ]
        );

        setUsuariosRecebePontos(newUsuarioList);

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
                                    <input id={`optionSelected${item.id}`} name={`optionSelected${item.id}`} value={item.id} type="checkbox" onChange={handleChangeRemove} />
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
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={pontuarDesbravadores}
                >
                    pontuar
                </button>

                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={passSelectedToPointSideRemove}
                >
                    Remover
                </button>
            </div>
            <br />
            <div className="mt-4 flex flex-row justify-between w-full">


            </div>
        </div>
    );
}