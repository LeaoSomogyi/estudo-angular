import { Endereco } from "./endereco.model";

export class Cliente {
    codigo: number = 0;
    nome: string = '';
    email: string = '';
    data_nascimento: string = '';
    ativo: boolean = true;
    lista_endereco: Endereco[] = []
}