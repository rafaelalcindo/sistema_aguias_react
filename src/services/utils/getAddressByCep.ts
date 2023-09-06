import api from "../api"

interface Endereco {
    logradouro?: string;
    number?: number;
    bairro?: string;
    complemento?: string;
    localidade?: string;
    uf?: string;
}

async function addressByCep(cep: string): Promise<Endereco> {
    const { data } = await api({ baseURL: `https://viacep.com.br/ws/${cep}/json/` });

    return data;
}

export { addressByCep }