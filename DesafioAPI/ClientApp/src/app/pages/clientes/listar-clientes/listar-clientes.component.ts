import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente.model';
import { ApiResponse } from 'src/app/models/response.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RemoverClienteDialogComponent } from '../remover-cliente-dialog/remover-cliente-dialog.component';
import { filter } from 'rxjs';
import { AlterarClienteDialogComponent } from '../alterar-cliente-dialog/alterar-cliente-dialog.component';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarClientesComponent {
  @Output('atualizarLista') atualizarEmit = new EventEmitter<boolean>();
  @Input('dados') dados !: ApiResponse<Cliente | Cliente[]>;

  get dataSource() {
    if (this.dados.resultado) {
      return Array.isArray(this.dados.resultado) ?
        this.dados.resultado : [this.dados.resultado];
    }

    return [];
  }

  displayedColumns = ['id', 'nome', 'sexo', 'dataNascimento', 'idade', 'localizacao', 'acoes'];

  constructor(
    private dialog: MatDialog
  ) { }

  alterar(cliente: Cliente) {
    const dialogRef = this.dialog.open(AlterarClienteDialogComponent, {
      data: { cliente },
      maxWidth: '600px',
      minWidth: '600px'
    });

    dialogRef.afterClosed()
      .pipe(filter(v => !!v))
      .subscribe(() => { this.atualizarEmit.emit(true); })
  }

  remover(cliente: Cliente) {
    const dialogRef = this.dialog.open(RemoverClienteDialogComponent, {
      data: { cliente },
      maxWidth: '600px',
      minWidth: '600px'
    });

    dialogRef.afterClosed()
      .pipe(filter(v => !!v))
      .subscribe(() => { this.atualizarEmit.emit(true); })
  }
}
