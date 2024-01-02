import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, tap, finalize } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { CadastrarClienteDialogComponent } from '../cadastrar-cliente-dialog/cadastrar-cliente-dialog.component';
import { Cliente } from 'src/app/models/cliente.model';
import { FORM_MODULES } from '@pages/shared/form-modules';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-alterar-cliente-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ...FORM_MODULES,
  ],
  templateUrl: './alterar-cliente-dialog.component.html',
  styleUrls: ['./alterar-cliente-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlterarClienteDialogComponent implements AfterViewInit {
  form: FormGroup;

  private alterandoAction$ = new BehaviorSubject<boolean>(false);
  public alterando$ = this.alterandoAction$.asObservable();

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { cliente: Cliente },
    private dialogRef: MatDialogRef<CadastrarClienteDialogComponent>,
    private clienteService: ClienteService,
    private snackBar: SnackBarService,
  ) {
    this.form = fb.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.data) {
        this.form.patchValue({
          id: this.data.cliente.id,
          nome: this.data.cliente.nome
        });
      }
    });
  }

  alterar() {
    this.alterandoAction$.next(true);

    if (this.form.invalid) {
      this.snackBar.danger('Contém campo(s) inválido(s).');
      this.form.markAllAsTouched();
      this.alterandoAction$.next(false);

      return;
    }

    const model = { ...this.form.value };
    this.clienteService.alterar(this.data.cliente.id, model)
      .pipe(
        tap((dados) => {
          if (dados.sucesso) {
            this.snackBar.success(dados.mensagem);
            this.dialogRef.close(true);
          } else {
            this.snackBar.danger(dados.mensagemCompleta || dados.mensagem);
          }
        }),
        finalize(() => { this.alterandoAction$.next(false); })
      ).subscribe();
  }
}
