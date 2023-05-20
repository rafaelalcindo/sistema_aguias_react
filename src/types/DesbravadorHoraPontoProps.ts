import { HoraPontoProps } from "./HoraPontoProps";
import { UsuarioProps } from "./Usuario";
import { UsuarioPontoProps } from "./UsuarioPonto";

export interface DesbravadorHoraPontoProps {
    id: number;
    usuario_id: number;
    hora_ponto_id: number;
    usuario?: UsuarioProps;
    hora_ponto?: HoraPontoProps;
    data_chegada: string;
    hora_chegada: string;
    ponto_individual_id?: number;
    ponto_individual?: UsuarioPontoProps;
}