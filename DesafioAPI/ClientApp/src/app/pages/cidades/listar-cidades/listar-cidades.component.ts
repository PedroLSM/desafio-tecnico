import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cidade } from '@models/cidade.model';
import { ApiResponse } from '@models/response.model';

@Component({
  selector: 'app-listar-cidades',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './listar-cidades.component.html',
  styleUrls: ['./listar-cidades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarCidadesComponent {
  @Input('dados') dados !: ApiResponse<Cidade[]>;

  displayedColumns = ['id', 'nome', 'estado'];
}
