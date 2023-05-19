import React, { useState, useEffect, useContext, Fragment, useCallback } from 'react';
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

import { HoraPontoProps } from '../../../types/HoraPontoProps';
import { ListaProps } from '../../../types/ListaProps';

interface FormValues {
    descricao: string;
    data_programacao: string;
    hora_programacao: string;
    pontos: number;
}

export function HoraPontosAdd() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [date, setDate] = useState('');

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

    async function getHoraPonto() {
        if (id) {
            const { data } = await api.get<HoraPontoProps>(`/horaponto/${id}`);

            setValue('descricao', data.descricao);
            setValue('data_programacao', moment(data.data_programacao).utc().format('YYYY-MM-DD'));
            setDate(moment(data.data_programacao).utc().format('YYYY-MM-DD'));
            setValue('hora_programacao', data.hora_programacao);
            setValue('pontos', data.pontos);
        }
    }

    useEffect(() => {
        getHoraPonto();
    }, []);

    const schema = yup.object().shape({
        descricao: yup.number().required("Campo obrigatório"),
        data_programacao: yup.string().required("Campo obrigatório"),
        hora_programacao: yup.string().required("Campo obrigatório"),
        pontos: yup.number().required("Campo obrigatório"),
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        if (data.data_programacao == '') {
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
                response = await api.put(`horaponto/update/${id}`, data);
            } else {
                response = await api.post(`horaponto/add`, data);
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
                    title: 'Data e a Hora foram cadastrada',
                    text: 'A data e a hora foi adicionada com sucesso!'
                });

                navigate('/horaponto');
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
                    title='Cadastro de eventos'
                    description='Área de cadastro de horas e pontos'
                    formName='horaPontoRegisterForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >
                    <form
                        action="#"
                        method="POST"
                        id="horaPontoRegisterForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="titulo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Descrição:
                                </label>
                                <input
                                    {...register(`descricao`)}
                                    type="text"
                                    name="descricao"
                                    id="descricao"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        setValue(`descricao`, e.target.value)
                                    }
                                        // 
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
                                    htmlFor="date_call"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Data:
                                </label>
                                <input
                                    {...register("data_programacao")}
                                    type="date"
                                    name="data_programacao"
                                    id="data_programacao"
                                    // min={new Date().toISOString().split('T')[0]}
                                    autoComplete="given-date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {

                                        setValue(
                                            "data_programacao",
                                            e.target.value
                                        );
                                        setDate(e.target.value);
                                    }}
                                    value={date}
                                />
                                {errors.data_programacao && (
                                    <span className="text-mainDarkRed">
                                        {errors.data_programacao.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="date_call"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Hora:
                                </label>
                                <input
                                    {...register("hora_programacao")}
                                    type="time"
                                    name="hora_programacao"
                                    id="hora_programacao"
                                    // min={new Date().toISOString().split('T')[0]}
                                    autoComplete="given-date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {

                                        setValue(
                                            "hora_programacao",
                                            e.target.value
                                        );
                                    }}
                                />
                                {errors.hora_programacao && (
                                    <span className="text-mainDarkRed">
                                        {errors.hora_programacao.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="pontos"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Pontos:
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
                        </div>
                    </form>
                </PainelForm>
            </div>
        </Menubar>
    );

}