import { Cidade } from "./cidade.model";

export interface Cliente {
	id: number;
	nome: string;
	sexo: string;
	dataNascimento: string;
	idade: number;
	cidadeId: number;
	cidade: Cidade;
}

export type ConsultaClienteForm = {
	tipo: 'Nome' | 'Id';
	valor: string;
}