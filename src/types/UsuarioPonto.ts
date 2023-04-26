import { UsuarioProps } from "./Usuario";

export interface UsuarioPontoProps {
    id: number;
    pontos: number;
    descricao?: string;
    data_pontos: Date;
    usuario_id: number;
    usuario: UsuarioProps;
    created_at?: Date;
    updated_at?: Date;
}