import { Usuario } from './usuario';

export class FonteDeRenda {
    cod: number;
    descricao: string;
    valor: number;
    dtValidade: Date;
    usuario: Usuario;
}