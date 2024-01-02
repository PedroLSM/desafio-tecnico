import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConsultaCidadeForm, Cidade } from '@models/cidade.model';
import { ApiResponse } from '@models/response.model';
import { FormConsultarComponent } from '@pages/shared/form-consultar/form-consultar.component';
import { CidadeService } from '@services/cidade.service';
import { CadastrarCidadeDialogComponent } from '../cadastrar-cidade-dialog/cadastrar-cidade-dialog.component';
import { ListarCidadesComponent } from '../listar-cidades/listar-cidades.component';

@Component({
  selector: 'app-page-cidades',
  standalone: true,
  imports: [
    CommonModule,
    FormConsultarComponent,
    ListarCidadesComponent,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  templateUrl: './page-cidades.component.html',
  styleUrls: ['./page-cidades.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PageCidadesComponent {
  model?: ConsultaCidadeForm;
  cidades$?: Observable<ApiResponse<Cidade[]>>;

  constructor(
    private cidadeService: CidadeService,
    private dialog: MatDialog,
  ) { }

  consultarCidades(model?: ConsultaCidadeForm) {
    this.model = undefined;
    this.cidades$ = undefined;

    if (model) {
      this.model = model;
      this.cidades$ = this.cidadeService.consultarPor(model.tipo, model.valor);
    }
  }

  cadastrarCidade() {
    const dialogRef = this.dialog.open(CadastrarCidadeDialogComponent, {
      maxWidth: '600px',
      minWidth: '600px'
    });

    dialogRef.afterClosed()
      .pipe(filter(v => !!v))
      .subscribe(() => { this.consultarCidades(this.model); })
  }
}
