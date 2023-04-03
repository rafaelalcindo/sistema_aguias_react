import api from "../api"


async function addressByCep(cep: string) {
    const { data } = await api({ baseURL: `https://viacep.com.br/ws/${cep}/json/` })

    return data;
}

export { addressByCep }