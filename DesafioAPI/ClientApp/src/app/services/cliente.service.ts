import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { Cliente } from '@models/cliente.model';
import { ApiResponse } from '@models/response.model';

@Injectable({ providedIn: 'root' })
export class ClienteService extends ApiBaseService {

    consultarPor(tipo: string, valor: string): Observable<ApiResponse<Cliente[] | Cliente>> {
        return this.get<ApiResponse<Cliente[] | Cliente>>(`/Clientes/Consultar/${tipo}/${valor}`);
    }

    alterar(id: number, model: Cliente): Observable<ApiResponse<any>> {
        return this.put(`/Clientes/Alterar/${id}`, model);
    }

    cadastrar(model: Cliente): Observable<ApiResponse<any>> {
        return this.post(`/Clientes/Cadastrar`, model);
    }

    remover(model: Cliente): Observable<ApiResponse<any>> {
        return this.delete(`/Clientes/Remover/${model.id}`);
    }

}