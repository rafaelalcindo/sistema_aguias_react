import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { handleChangeMask } from '../../../services/utils/mask';
import { removeMask } from '../../../services/utils/removeMask';
import { addressByCep } from '../../../services/utils/getAddressByCep';
import * as yup from "yup";
import { useForm } from "react-hook-form";

import Swal from 'sweetalert2';

import api from '../../../services/api';

import { Context } from '../../../context/AuthContext';
import { Menubar } from '../../../components/Menubar';
import { PainelForm } from '../../../components/PainelForm';
import { ListaProps } from '../../../types/ListaProps';
import { UnidadeProps } from '../../../types/Unidade';
import { UsuarioProps } from '../../../types/Usuario';

interface RegistrationProps {
    nome: string;
    sobrenome: string;
    login: string;
    password?: string;
    cep: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
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

interface listagemUnidadeProps extends ListaProps {
    list: UnidadeProps[];
}

export function UsuarioAdd() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unidadeList, setUnidadeList] = useState<UnidadeProps[]>([]);
    const [cep, setCep] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [cel, setCel] = useState<string>("");

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

    // async function getUsuario() {

    // }

    useEffect(() => {

        async function getUsuario() {
            if (id) {
                const { data } = await api.get<UsuarioProps>(`usuario/${id}`);

                setValue("nome", data.nome);
                setValue("sobrenome", data.sobrenome);
                setValue("login", data.login);
                setValue("tel", handleChangeMask(data.tel, 'phone'));
                setValue("cel", handleChangeMask(data.cel, 'phone'));
                setValue("tamanho_camisa", data.tamanho_camisa);
                setValue("nivel", data.nivel);
                setValue("unidade_id", Number(data.unidade_id));

                // Endereços
                setValue("cep", handleChangeMask(data.cep, 'cep'));
                setValue("endereco", data.endereco);
                setValue("numero", data.numero);
                setValue("complemento", data.complemento);
                setValue("bairro", data.bairro);
                setValue("cidade", data.cidade);
                setValue("estado", data.estado);
            }
        }

        getUnidades();
        getUsuario();
    }, []);

    const schema = yup.object().shape({
        nome: yup.string().required("Campo obrigatório"),
        sobrenome: yup.string().required("Campo Obrigatório"),
        login: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo Obrigatório"),

        cep: yup.string().required("Campo Obrigatório"),
        endereco: yup.string().required("Campo Obrigatório"),
        numero: yup.string().required("Campo Obrigatório"),
        complemento: yup.string().required("Campo Obrigatório"),
        bairro: yup.string().required("Campo Obrigatório"),
        cidade: yup.string().required("Campo Obrigatório"),
        estado: yup.string().required("Campo Obrigatório"),


        tel: yup.string().required("Campo Obrigatório"),
        cel: yup.string().required("Campo Obrigatório"),
        unidade_id: yup.string().required("Campo Obrigatório"),

        tamanho_camisa: yup.string().required("Campo Obrigatório"),

        nivel: yup.number().required("Campo obrigatório")
    });

    const nivelHierarquia = [
        { id: 1, nome: 'ADM' },
        { id: 2, nome: 'Conselheiro' },
        { id: 3, nome: 'Desbravador' }
    ] as any;

    let listaEstado = [
        { sigla: 'AC', nome: 'ACRE' },
        { sigla: 'AP', nome: 'AMAPÁ' },
        { sigla: 'AM', nome: 'AMAZONAS' },
        { sigla: 'BA', nome: 'BAHIA' },
        { sigla: 'CE', nome: 'CEARÁ' },
        { sigla: 'DF', nome: 'DISTRITO FEDERAL' },
        { sigla: 'ES', nome: 'ESPIRITO SANTO' },
        { sigla: 'GO', nome: 'GOIÁS' },
        { sigla: 'MA', nome: 'MARANHÃO' },
        { sigla: 'MT', nome: 'MATO GROSSO' },
        { sigla: 'MS', nome: 'MATO GROSSO DO SUL' },
        { sigla: 'MG', nome: 'MINAS GERIAS' },
        { sigla: 'PA', nome: 'PARÁ' },
        { sigla: 'PB', nome: 'PARAÍBA' },
        { sigla: 'PR', nome: 'PARANÁ' },
        { sigla: 'PE', nome: 'PERNAMBUCO' },
        { sigla: 'PI', nome: 'PIAUÍ' },
        { sigla: 'RJ', nome: 'RIO DE JANEIRO' },
        { sigla: 'RN', nome: 'RIO GRANDE DO NORTE' },
        { sigla: 'RS', nome: 'RIO GRANDE DO SUL' },
        { sigla: 'RO', nome: 'RONDÔNIA' },
        { sigla: 'RR', nome: 'RORAIMA' },
        { sigla: 'SC', nome: 'SANTA CATARINA' },
        { sigla: 'SP', nome: 'SÃO PAULO' },
        { sigla: 'SE', nome: 'SERGIPE' },
        { sigla: 'TO', nome: 'TOCANTINS' },
    ];

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<RegistrationProps>({
        // defaultValues: {
        //     pontos: 0,
        //     descricao: "",
        //     data_pontos: ""
        // }
    });

    const onSubmit = async (data: RegistrationProps) => {
        setIsLoading(true);

        let insertUsuario = {
            nome: data.nome,
            sobrenome: data.sobrenome,
            login: data.login,
            password: data.password,
            tel: removeMask(String(data.tel), 'phone'),
            cel: removeMask(String(data.cel), 'phone'),
            tamanho_camisa: data.tamanho_camisa,
            nivel: data.nivel,
            unidade_id: data.unidade_id,
            cep: removeMask(data.cep, 'cep'),
            endereco: data.endereco,
            // bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.cidade,
            estado: data.estado
        };

        if (
            insertUsuario.password != undefined &&
            insertUsuario.password.length == 0 &&
            id != undefined
        ) {
            delete insertUsuario.password;
        }

        try {
            let response;

            if (id) {
                response = await api.put(`/usuario/update/${id}`, insertUsuario);
            } else {
                response = await api.post(`/usuario/add`, insertUsuario);
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
                    title: 'Usuario cadastrada',
                    text: 'A usuario foi adicionada com sucesso!'
                });

                navigate('/usuarios');
            }

        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema',
                text: 'Não conseguimos realizar o cadastro'
            });

            setIsLoading(false);
        }
    }

    async function completeAddress(cep: string) {
        if (cep.length == 9) {
            let cepSearch = cep.replace('-', '');
            const address = await addressByCep(cepSearch);

            if (address.logradouro) {
                setValue('endereco', address.logradouro);
                setValue('bairro', address.bairro);
                setValue('complemento', address.complemento);
                setValue('cidade', address.localidade);
                setValue('estado', address.uf);
            }
        }
    }

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

                    <form
                        action="#"
                        method="POST"
                        id="userForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className="grid grid-cols-6 gap-6 p-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="nome"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nome
                                </label>
                                <input
                                    {...register(`nome`)}
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    autoComplete="Nome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`nome`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.nome
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="sobrenome"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Sobrenome:
                                </label>
                                <input
                                    {...register(`sobrenome`)}
                                    type="text"
                                    name="sobrenome"
                                    id="sobrenome"
                                    autoComplete="Sobrenome"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`sobrenome`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.sobrenome
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="login"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    login:
                                </label>
                                <input
                                    {...register(`login`)}
                                    type="text"
                                    name="login"
                                    id="login"
                                    autoComplete="Login"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`login`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.login
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    password:
                                </label>
                                <input
                                    {...register(`password`)}
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="Senha"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`password`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.password
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="cep"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    cep:
                                </label>
                                <input
                                    {...register(`cep`)}
                                    type="text"
                                    name="cep"
                                    id="cep"
                                    autoComplete="cep"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {

                                        const formated = handleChangeMask(
                                            e.target.value,
                                            "cep"
                                        );
                                        setCep(formated);
                                        setValue(
                                            `cep`,
                                            e.target.value
                                        );
                                        e.target.value = formated;
                                        completeAddress(formated);
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.cep
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="endereco"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Endereco:
                                </label>
                                <input
                                    {...register(`endereco`)}
                                    type="text"
                                    name="endereco"
                                    id="endereco"
                                    autoComplete="endereco"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`endereco`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.endereco
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            {/* <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="numero"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    numero:
                                </label>
                                <input
                                    {...register(`numero`)}
                                    type="text"
                                    name="numero"
                                    id="numero"
                                    autoComplete="numero"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {

                                        setValue(`numero`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.numero
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div> */}

                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="complemento"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Complemento:
                                </label>
                                <input
                                    {...register(`complemento`)}
                                    type="text"
                                    name="complemento"
                                    id="complemento"
                                    autoComplete="complemento"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {

                                        setValue(`complemento`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.complemento
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            {/* <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="bairro"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Bairro:
                                </label>
                                <input
                                    {...register(`bairro`)}
                                    type="text"
                                    name="bairro"
                                    id="bairro"
                                    autoComplete="bairro"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`bairro`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.bairro
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div> */}


                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="cidade"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Cidade:
                                </label>
                                <input
                                    {...register(`cidade`)}
                                    type="text"
                                    name="cidade"
                                    id="cidade"
                                    autoComplete="Cidade"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`cidade`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.cidade
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-1 sm:col-span-1">

                                <label
                                    htmlFor="estado"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    estado
                                </label>
                                <select
                                    {...register("estado")}
                                    id="estado"
                                    name="estado"
                                    autoComplete="estado"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {
                                        setValue(
                                            "estado",
                                            e.target.value
                                        );
                                    }}
                                >
                                    <option value='' >Selecione</option>
                                    {
                                        listaEstado ?
                                            listaEstado.map((estado: any) => {

                                                return <option key={estado.sigla} value={estado.sigla} >{estado.nome}</option>;
                                            }
                                            )
                                            :
                                            ''
                                    }

                                </select>
                                {errors.estado && (
                                    <span className="text-mainDarkRed">
                                        {errors.estado.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="tel"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Telefone:
                                </label>
                                <input
                                    {...register(`tel`)}
                                    type="text"
                                    name="tel"
                                    id="tel"
                                    autoComplete="Telefone"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        const formated = handleChangeMask(
                                            e.target.value,
                                            'phone'
                                        );
                                        setTel(formated);
                                        setValue(`tel`, e.target.value);
                                        e.target.value = formated;
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.cel
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="cel"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Celular:
                                </label>
                                <input
                                    {...register(`cel`)}
                                    type="text"
                                    name="cel"
                                    id="cel"
                                    autoComplete="Celular"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        const formated = handleChangeMask(
                                            e.target.value,
                                            'phone'
                                        );
                                        setCel(formated);
                                        setValue(`cel`, e.target.value);
                                        e.target.value = formated;
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.cel
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="tamanho_camisa"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    T. camiseta:
                                </label>
                                <input
                                    {...register(`tamanho_camisa`)}
                                    type="text"
                                    name="tamanho_camisa"
                                    id="tamanho_camisa"
                                    autoComplete="tamanho_camisaular"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-800 focus:border-indigo-800 sm:text-sm"
                                    onChange={(e) => {
                                        setValue(`tamanho_camisa`, e.target.value)
                                    }
                                        // 
                                    }
                                />
                                <span className="text-mainDarkRed">
                                    {errors?.tamanho_camisa
                                        ? "Campo obrigatório"
                                        : ""}
                                </span>
                            </div>

                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="nivel"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    nivel
                                </label>
                                <select
                                    {...register("nivel")}
                                    id="nivel"
                                    name="nivel"
                                    autoComplete="nivel"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mainDarkRed focus:border-mainDarkRed sm:text-sm"
                                    onChange={(e) => {
                                        setValue(
                                            "nivel",
                                            Number(e.target.value)
                                        );
                                    }}
                                >
                                    <option value='' >Selecione</option>
                                    {
                                        nivelHierarquia ?
                                            nivelHierarquia.map((nivels: any) => {

                                                return <option key={nivels.id} value={nivels.id} >{nivels.nome}</option>;
                                            }
                                            )
                                            :
                                            ''
                                    }

                                </select>
                                {errors.nivel && (
                                    <span className="text-mainDarkRed">
                                        {errors.nivel.message}
                                    </span>
                                )}
                            </div>


                            <div className="col-span-1 sm:col-span-1">
                                <label
                                    htmlFor="unidade_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Unidade
                                </label>
                                <select
                                    {...register("unidade_id")}
                                    id="unidade_id"
                                    name="unidade_id"
                                    autoComplete="unidade_id"
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
                                            unidadeList.map((unidade: any) => {
                                                return <option key={unidade.id} value={unidade.id} >{unidade.nome}</option>;
                                            }
                                            )
                                            :
                                            ''
                                    }

                                </select>
                                {errors.nivel && (
                                    <span className="text-mainDarkRed">
                                        {errors.unidade_id?.message}
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