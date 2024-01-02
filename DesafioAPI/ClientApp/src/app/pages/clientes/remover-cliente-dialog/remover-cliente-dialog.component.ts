import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { FORM_MODULES } from '@pages/shared/form-modules';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-remover-cliente-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ...FORM_MODULES,
  ],
  templateUrl: './remover-cliente-dialog.component.html',
  styleUrls: ['./remover-cliente-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoverClienteDialogComponent {

  private removendoAction$ = new BehaviorSubject<boolean>(false);
  public removendo$ = this.removendoAction$.asObservable();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    private dialogRef: MatDialogRef<RemoverClienteDialogComponent>,
    private clienteService: ClienteService,
    private snackBar: SnackBarService,
  ) {
  }

  remover() {
    this.removendoAction$.next(true);

    this.clienteService.remover(this.data.cliente)
      .pipe(
        tap((dados) => {
          if (dados.sucesso) {
            this.snackBar.success(dados.mensagem);
            this.dialogRef.close(true);
          } else {
            this.snackBar.danger(dados.mensagemCompleta || dados.mensagem);
          }
        }),
        finalize(() => { this.removendoAction$.next(false); })
      ).subscribe();
  }

}
