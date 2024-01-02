import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { Cidade } from '@models/cidade.model';
import { ApiResponse } from '@models/response.model';

@Injectable({ providedIn: 'root' })
export class CidadeService extends ApiBaseService {

    consultarPor(tipo: string, valor: string): Observable<ApiResponse<Cidade[]>> {
        return this.get<ApiResponse<Cidade[]>>(`/Cidades/Consultar/${tipo}/${valor}`);
    }

    cadastrar(model: Cidade) {
        return this.post<ApiResponse<any>>(`/Cidades/Cadastrar`, model);
    }

}