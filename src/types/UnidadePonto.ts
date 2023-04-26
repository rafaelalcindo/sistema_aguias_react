import { UnidadeProps } from "./Unidade";

export interface UnidadePontoProps {
    id: number;
    pontos: number;
    descricao?: string;
    data_pontos: Date;
    unidade_id: number;
    unidade: UnidadeProps;
    created_at?: Date;
    updated_at?: Date;
}