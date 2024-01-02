export interface ApiResponse<T> {
	statusCode: number;
	sucesso: boolean;
	mensagem: string;
	mensagemCompleta?: string;
	erros?: string[];
	resultado?: T;
}