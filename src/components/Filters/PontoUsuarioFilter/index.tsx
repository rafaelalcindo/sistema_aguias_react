import React, { useCallback, useState } from 'react';

import api from '../../../services/api';
import { ListaProps } from '../../../types/ListaProps';
import { UsuarioProps } from '../../../types/Usuario';

import styles from '../styles.module.scss';

type UsuarioFilterProps = {
    setFilterString: (order: string) => void;
}

interface listagemProps extends ListaProps {
    list: UsuarioProps
}

export function PontoUsuarioFilter({
    setFilterString
}: UsuarioFilterProps) {

    const [search, setSearch] = useState('');
    const [usuario, setUsuario] = useState('');
    const [usuarioList, setUsuarioList] = useState<UsuarioProps[]>([]);

    const getUsuarios = useCallback(async () => {
        try {
            const { data } = await api.get<UsuarioProps>(``);
        } catch {
            console.log('deu erro');
        }
    }, []);

}