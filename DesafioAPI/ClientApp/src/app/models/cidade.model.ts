export interface Cidade {
	id: number;
	nome: string;
	estado: string;
}

export type ConsultaCidadeForm = {
	tipo: 'Nome' | 'Estado';
	valor: string;
}