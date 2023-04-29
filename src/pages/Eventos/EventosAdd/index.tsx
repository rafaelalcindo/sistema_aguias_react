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

import { EventoProps } from '../../../types/EventoProps';
import { ListaProps } from '../../../types/ListaProps';

interface FormValues {
    titulo: string;
    descricao: string;
    data_evento: string;
    ponto_evento: number;
}

interface listagemEventosProps extends ListaProps {
    list: EventoProps[];
}

export function EventosAdd() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [eventoList, setEventoList] = useState<EventoProps[]>([]);
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

    async function getEvento() {
        if (id) {
            const { data } = await api.get<EventoProps>(`/evento/${id}`);

            setValue('titulo', data.titulo);
            setValue('descricao', data.descricao);
            setValue('data_evento', moment(data.data_evento).utc().format('YYYY-MM-DD'));
            setDate(moment(data.data_evento).utc().format('YYYY-MM-DD'));
            setValue('ponto_evento', data.ponto_evento);
        }
    }

    useEffect(() => {
        getEvento();
    }, []);

    const schema = yup.object().shape({
        titulo: yup.number().required("Campo obrigatório"),
        descricao: yup.string().required("Campo obrigatório"),
        data_evento: yup.string().required("Campo obrigatório"),
        ponto_evento: yup.number().required("Campo obrigatório"),
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        if (data.data_evento == '') {
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
                response = await api.put(`evento/update/${id}`, data);
            } else {
                response = await api.post('evento/add', data);
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

                navigate('/eventos');
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
                    description='Área de cadastro de eventos'
                    formName='eventoRegisterForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >
                    <form
                        action="#"
                        method="POST"
                        id="eventoRegisterForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="titulo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    titulo do Desbravador:
                                </label>
                                <input
                                    {...register(`titulo`)}
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        setValue(`titulo`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.titulo
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
                                    autoComplete="Descrição"
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
                                    htmlFor="date_call"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Data do evento
                                </label>
                                <input
                                    {...register("data_evento")}
                                    type="date"
                                    name="data_evento"
                                    id="data_evento"
                                    // min={new Date().toISOString().split('T')[0]}
                                    autoComplete="given-date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {

                                        setValue(
                                            "data_evento",
                                            e.target.value
                                        );
                                        setDate(e.target.value);
                                    }}
                                    value={date}
                                />
                                {errors.data_evento && (
                                    <span className="text-mainDarkRed">
                                        {errors.data_evento.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="ponto_evento"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Pontos:
                                </label>
                                <input
                                    {...register(`ponto_evento`)}
                                    type="number"
                                    name="ponto_evento"
                                    id="ponto_evento"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        setValue(`ponto_evento`, Number(e.target.value))
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.ponto_evento
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