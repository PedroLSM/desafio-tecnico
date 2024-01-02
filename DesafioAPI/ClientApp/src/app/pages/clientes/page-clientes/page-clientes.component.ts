import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListarClientesComponent } from '../listar-clientes/listar-clientes.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Cliente, ConsultaClienteForm } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ApiResponse } from 'src/app/models/response.model';
import { Observable, filter } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CadastrarClienteDialogComponent } from '../cadastrar-cliente-dialog/cadastrar-cliente-dialog.component';
import { FormConsultarComponent } from '../../shared/form-consultar/form-consultar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-page-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormConsultarComponent,
    ListarClientesComponent,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  templateUrl: './page-clientes.component.html',
  styleUrls: ['./page-clientes.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PageClientesComponent {
  model?: ConsultaClienteForm;
  clientes$?: Observable<ApiResponse<Cliente[] | Cliente>>;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
  ) { }

  consultarClientes(model?: ConsultaClienteForm) {
    this.model = undefined;
    this.clientes$ = undefined;

    if (model) {
      this.model = model;
      this.clientes$ = this.clienteService.consultarPor(model.tipo, model.valor);
    }
  }

  cadastrarCliente() {
    const dialogRef = this.dialog.open(CadastrarClienteDialogComponent, {
      maxWidth: '600px',
      minWidth: '600px'
    });

    dialogRef.afterClosed()
      .pipe(filter(v => !!v))
      .subscribe(() => { this.consultarClientes(this.model); })
  }
}
