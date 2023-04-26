import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Swal from 'sweetalert2';

import { Menubar } from '../../../components/Menubar';
import { PainelForm } from '../../../components/PainelForm';

interface RegistrationProps {
    nome: string;
    sobrenome: string;
    login: string;
    password: string;
    cep?: string;
    endereco?: string;
    complemento?: string;
    cidade?: string;
    estado?: string;
    tel?: string;
    cel?: string;
    data_nasc: any;
    rg?: string;
    cpf?: string;
    tamanho_camisa?: string;
    nivel: number;
    unidade_id: number;
}

export function UsuarioAdd() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const schema = yup.object().shape({
        nome: yup.string().required("Campo obrigatório"),
        sobrenome: yup.string().required("Campo Obrigatório"),
        password: yup.string().required("Campo Obrigatório"),

        nivel: yup.number().required("Campo obrigatório"),
        unidade_id: yup.number().required("Campo Obrigatório")
    })

    return (
        <Menubar>
            <div className={`container mx-auto pt-8`}>
                <PainelForm
                    title='Cadastro de Desbravador'
                    description='Área de cadastro de desbravadores no sistema'
                    formName='userForm'
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                >

                </PainelForm>
            </div>
        </Menubar>
    );
}