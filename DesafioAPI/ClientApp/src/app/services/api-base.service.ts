import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, catchError, of, pipe } from 'rxjs';

type HttpOptions = {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiBaseService {
    protected http = inject(HttpClient);
    protected baseUrl = environment.baseUrl;

    protected get<T>(path: string, options: HttpOptions = {}): Observable<T> {
        return this.http.get<T>(`/api${path}`, options)
            .pipe(handlerErrorResponse()) as Observable<T>;
    }

    protected post<T>(path: string, body: any, options: HttpOptions = {}): Observable<T> {
        return this.http.post<T>(`/api${path}`, body, options)
            .pipe(handlerErrorResponse()) as Observable<T>;
    }

    protected put<T>(path: string, body: any, options: HttpOptions = {}): Observable<T> {
        return this.http.put<T>(`/api${path}`, body, options)
            .pipe(handlerErrorResponse()) as Observable<T>;
    }

    protected delete<T>(path: string, options: HttpOptions = {}): Observable<T> {
        return this.http.delete<T>(`/api${path}`, options)
            .pipe(handlerErrorResponse()) as Observable<T>;
    }
}

function handlerErrorResponse() {
    return pipe(
        catchError((err: HttpErrorResponse) => {
            if (!err.error) {
                return of({ statusCode: err.status, sucesso: false, mensagem: 'Ops, Algo deu errado!' });
            }

            if (typeof err.error === 'string') {
                return of({ statusCode: err.status, sucesso: false, mensagem: err.error });
            }

            const dados = { ...err.error };

            if ('errors' in dados) {
                let mensagem = 'Ocorreram um ou mais erros de validação: \n';

                for (const key in dados.errors) {
                    const errors = dados.errors[key as keyof typeof dados.erros];

                    for (const error of errors) {
                        if (!error) continue;
                        mensagem += `• ${error} \n`;
                    }
                }

                if (mensagem.endsWith('\n'))
                    mensagem = mensagem.substring(0, mensagem.length - 2);

                return of({ statusCode: dados.status, sucesso: false, mensagem })
            }

            let mensagem = dados.mensagem + " \n";

            if (dados.erros?.length) {
                for (const erro of dados.erros) {
                    if (!erro) continue;
                    mensagem += `• ${erro} \n`;
                }
            }

            if (mensagem.endsWith('\n'))
                mensagem = mensagem.substring(0, mensagem.length - 2);

            dados.mensagemCompleta = mensagem;

            return of(dados);
        })
    );
}