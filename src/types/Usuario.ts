export interface UsuarioProps {
    id: string;
    nome: string;
    sobrenome: string;
    login: string;
    password: string;
    cep: string;
    endereco: string;
    complemento: string;
    cidade: string;
    estado: string;
    tel: string;
    cel: string;
    ativo: boolean;
    data_nasc: Date;
    rg: string;
    cpf: string;
    tamanho_camisa: string;
    nivel: number;
    qr_code: string;
    foto_perfil: string;
    remember_token: string;

    unidade_id?: number;
}