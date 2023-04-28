import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import moment from 'moment';

import Swal from 'sweetalert2';

import { Context } from '../../../context/AuthContext';
import { Menubar } from '../../../components/Menubar';
import { PainelForm } from '../../../components/PainelForm';
import api from '../../../services/api';
import { UsuarioPontoProps } from '../../../types/UsuarioPonto';
import { ListaProps } from '../../../types/ListaProps';
import { UsuarioProps } from '../../../types/Usuario';

interface FormValues {
    pontos: number;
    descricao: string;
    data_pontos: string;
    usuario_id: number;
}

interface listagemUsuarioProps extends ListaProps {
    list: UsuarioProps[];
}

export function PontoIndividuaisAdd() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [usuarioList, setUsuarioList] = useState<UsuarioProps[]>([]);
    const [date, setDate] = useState<any>('');

    const { handleLogOut, usuario } = useContext(Context);

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        // defaultValues: {
        //     pontos: 0,
        //     descricao: "",
        //     data_pontos: ""
        // }
    });

    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<listagemUsuarioProps>(`/usuario?ativo=${1}`);

            setUsuarioList(data.list);
        } catch {
            handleLogOut();
        }
    }, []);

    async function getPontoUsuario() {
        await getUsuarios();

        if (id) {
            const { data } = await api.get<UsuarioPontoProps>(`/pontoindividual/${id}`);

            setValue('pontos', data.pontos);
            setValue('descricao', data.descricao ? data.descricao : '');
            setValue('data_pontos', moment(data.data_pontos).utc().format('YYYY-MM-DD'));
            setDate(moment(data.data_pontos).utc().format('YYYY-MM-DD'));
            setValue('usuario_id', data.usuario_id);
        }
    }

    useEffect(() => {
        getPontoUsuario();
    }, []);

    const schema = yup.object().shape({
        pontos: yup.number().required("Campo obrigatório"),
        descricao: yup.string().required("Campo obrigatório"),
        data_pontos: yup.string().required("Campo obrigatório"),
        usuario_id: yup.number().required("Campo obrigatório"),
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        if (data.usuario_id == 0) {
            Swal.fire(
                {
                    icon: 'error',
                    title: 'Erro',
                    text: 'Por favor, selecione o desbravador'
                }
            );
            return
        }
        if (data.data_pontos == '') {
            Swal.fire(
                {
                    icon: 'error',
                    title: 'Erro',
                    text: 'Por favor, selecione a data dos pontos'
                }
            );
            return
        }

        try {
            let response;

            if (id) {
                response = await api.put(`pontoindividual/update/${id}`, data);
            } else {
                response = await api.post(`pontoindividual/add`, data);
            }

            if (response.data.status === "Error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Tivemos um problema',
                    text: 'Não conseguimos realizar o cadastro'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Unidade cadastrada',
                    text: 'A unidade foi adicionada com sucesso!'
                });

                navigate('/pontousuarios');
            }

            setIsLoading(false);

        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema',
                text: 'Não conseguimos realizar o cadastro'
            });

            setIsLoading(false);
        }
    }

    return (
        <Menubar>
            <div className={`container mx-auto pt-8`}>
                <PainelForm
                    title='Cadastro de pontos'
                    description='Área de cadastro de pontos de unidade'
                    formName='usuarioPontosRegisterForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >

                    <form
                        action="#"
                        method="POST"
                        id="usuarioPontosRegisterForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="pontos"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    pontos do Desbravador:
                                </label>
                                <input
                                    {...register(`pontos`)}
                                    type="number"
                                    name="pontos"
                                    id="pontos"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        setValue(`pontos`, Number(e.target.value))
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.pontos
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="descricao"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Descrição do ponto:
                                </label>
                                <input
                                    {...register(`descricao` as const, {
                                        required: true,
                                    })}
                                    type="text"
                                    name="descricao"
                                    id="descricao"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) =>
                                        setValue(`descricao`, e.target.value)
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.descricao
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="usuario"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Desbravadores
                                </label>
                                <select
                                    {...register("usuario_id")}
                                    id="usuario"
                                    name="usuario"
                                    autoComplete="usuario"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {
                                        setValue(
                                            "usuario_id",
                                            Number(e.target.value)
                                        );
                                    }}
                                >
                                    <option value='' >Selecione</option>
                                    {
                                        usuarioList ?
                                            usuarioList.map(usuario => (
                                                <option key={usuario.id} value={usuario.id} >{usuario.nome} {usuario.sobrenome}</option>
                                            )
                                            )
                                            :
                                            ''
                                    }

                                </select>
                                {errors.usuario_id && (
                                    <span className="text-mainDarkRed">
                                        {errors.usuario_id.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="date_call"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Data de pontos
                                </label>
                                <input
                                    {...register("data_pontos")}
                                    type="date"
                                    name="data_pontos"
                                    id="data_pontos"
                                    // min={new Date().toISOString().split('T')[0]}
                                    autoComplete="given-date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {

                                        setValue(
                                            "data_pontos",
                                            e.target.value
                                        );
                                        setDate(e.target.value);
                                    }}
                                    value={date}
                                />
                                {errors.data_pontos && (
                                    <span className="text-mainDarkRed">
                                        {errors.data_pontos.message}
                                    </span>
                                )}
                            </div>


                        </div>
                    </form>
                </PainelForm>
            </div>
        </Menubar>
    );

}