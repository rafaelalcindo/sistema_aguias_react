import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Swal from 'sweetalert2';

import { Context } from '../../../context/AuthContext';

import { Menubar } from '../../../components/Menubar';
import { PainelForm } from '../../../components/PainelForm';
import api from '../../../services/api';
import history from '../../../services/history';
import { UnidadeProps } from '../../../types/Unidade';

interface FormValues {
    nome: string;
    equipamentos?: string;
}

export function UnidadeAdd() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleLogOut, usuario } = useContext(Context);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function getUnidade() {
            if (id) {
                const data = await api.get<UnidadeProps>(`unidade/${id}`);

                setValue("nome", data.data.nome);
                setValue("equipamentos", data.data.equipamentos);
            }
        }

        getUnidade();
    });

    const schema = yup.object().shape({
        nome: yup.string().required("Campo obrigatório")
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            nome: "",
            equipamentos: ""
        }
    });


    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);

        try {
            let response;

            if (id) {
                response = await api.put(`unidade/update/${id}`, data);
            } else {
                response = await api.post(`unidade/add`, data);
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

                navigate('/unidades');
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
                    title='Cadastro de Unidade'
                    description='Área de cadastro de unidades no sistema'
                    formName='unidadeRegisterForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >

                    <form
                        action="#"
                        method="POST"
                        id="unidadeRegisterForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6">
                                <label
                                    htmlFor="nome"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nome da Unidade:
                                </label>
                                <input
                                    {...register(`nome` as const, {
                                        required: true,
                                    })}
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) =>
                                        setValue(`nome`, e.target.value)
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.nome
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="equipamentos"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Materiais
                                </label>
                                <textarea
                                    {...register(`equipamentos`)}
                                    name="equipamentos"
                                    id="equipamentos"
                                    autoComplete="mome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) =>
                                        setValue(`equipamentos`, e.target.value)
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.equipamentos
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