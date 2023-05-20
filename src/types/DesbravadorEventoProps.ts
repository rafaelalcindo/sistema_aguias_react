import { EventoProps } from "./EventoProps";
import { UsuarioProps } from "./Usuario";

export interface DesbravadorEventoProps {
    id: number;
    usuario_id: number;
    evento_id: number;
    usuario?: UsuarioProps;
    evento?: EventoProps;
    created_at?: Date;
    updated_at?: Date;
}