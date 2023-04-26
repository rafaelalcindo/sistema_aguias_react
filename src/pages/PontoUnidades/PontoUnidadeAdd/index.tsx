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
import { UnidadePontoProps } from '../../../types/UnidadePonto';
import { ListaProps } from '../../../types/ListaProps';
import { UnidadeProps } from '../../../types/Unidade';

interface FormValues {
    pontos: number;
    descricao: string;
    data_pontos: string;
    unidade_id: number;
}

interface listagemUnidadeProps extends ListaProps {
    list: UnidadeProps[];
}

export function PontoUnidadeAdd() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unidadeList, setUnidadeList] = useState<UnidadeProps[]>([]);
    const [date, setDate] = useState<any>('');

    const { handleLogOut, usuario } = useContext(Context);

    const navigate = useNavigate();
    const { id } = useParams();

    const getUnidades = useCallback(async () => {
        try {
            const { data } = await api.get<listagemUnidadeProps>(`/unidade`);
            setUnidadeList(data.list);
        } catch {
            handleLogOut();
        }
    }, []);


    async function getPontoUnidade() {
        await getUnidades();
        if (id) {
            const { data } = await api.get<UnidadePontoProps>(`pontounidade/${id}`);

            setValue('pontos', data.pontos);
            setValue('descricao', data.descricao ? data.descricao : '');
            setValue('data_pontos', moment(data.data_pontos).utc().format('YYYY-MM-DD'));
            setDate(moment(data.data_pontos).utc().format('YYYY-MM-DD'));
            setValue('unidade_id', data.unidade_id);
        }
    }


    useEffect(() => {


        getPontoUnidade();

    }, []);

    const schema = yup.object().shape({
        pontos: yup.number().required("Campo obrigatório"),
        descricao: yup.string().required("Campo obrigatório"),
        data_pontos: yup.string().required("Campo obrigatório"),
        unidade_id: yup.number().required("Campo obrigatório"),
    });

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

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        if (data.unidade_id == 0) {
            Swal.fire(
                {
                    icon: 'error',
                    title: 'Erro',
                    text: 'Por favor, selecione a unidade'
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
                response = await api.put(`pontounidade/update/${id}`, data);
            } else {
                response = await api.post(`pontounidade/add`, data);
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

                navigate('/pontounidades');
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
                    formName='unidadePontosRegisterForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >
                    <form
                        action="#"
                        method="POST"
                        id="unidadePontosRegisterForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="pontos"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    pontos da Unidade:
                                </label>
                                <input
                                    {...register(`pontos`)}
                                    type="number"
                                    name="pontos"
                                    id="pontos"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
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
                                    Descrição de Unidade:
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
                                    htmlFor="unidade"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Unidade
                                </label>
                                <select
                                    {...register("unidade_id")}
                                    id="unidade"
                                    name="unidade"
                                    autoComplete="unidade"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {
                                        setValue(
                                            "unidade_id",
                                            Number(e.target.value)
                                        );
                                    }}
                                >
                                    <option value='' >Selecione</option>
                                    {
                                        unidadeList ?
                                            unidadeList.map(unidade => (
                                                <option key={unidade.id} value={unidade.id} >{unidade.nome}</option>
                                            )
                                            )
                                            :
                                            ''
                                    }

                                </select>
                                {errors.unidade_id && (
                                    <span className="text-mainDarkRed">
                                        {errors.unidade_id.message}
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