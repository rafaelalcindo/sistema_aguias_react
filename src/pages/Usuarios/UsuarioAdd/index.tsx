import React from 'react';
import { useParams } from "react-router-dom";
import { Menubar } from '../../../components/Menubar';
import { PainelForm } from '../../../components/PainelForm';

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";


export function UsuarioAdd() {
    return (
        <Menubar>
            <div className={`container mx-auto pt-8`}>
                <PainelForm
                    title='Cadastro de Desbravador'
                    description='Área de cadastro de desbravadores no sistema'
                >

                </PainelForm>
            </div>
        </Menubar>
    );
}