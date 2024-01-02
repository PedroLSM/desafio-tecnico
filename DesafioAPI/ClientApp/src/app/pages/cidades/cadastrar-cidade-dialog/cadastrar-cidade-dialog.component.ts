import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FORM_MODULES } from '@pages/shared/form-modules';
import { CidadeService } from '@services/cidade.service';
import { SnackBarService } from '@services/snack-bar.service';
import { BehaviorSubject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-cadastrar-cidade-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ...FORM_MODULES,
  ],
  templateUrl: './cadastrar-cidade-dialog.component.html',
  styleUrls: ['./cadastrar-cidade-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastrarCidadeDialogComponent {
  form: FormGroup;

  private cadastrandoAction$ = new BehaviorSubject<boolean>(false);
  public cadastrando$ = this.cadastrandoAction$.asObservable();

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarCidadeDialogComponent>,
    private snackBar: SnackBarService,
    private cidadeService: CidadeService,
  ) {
    this.form = fb.group({
      nome: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  cadastrar() {
    this.cadastrandoAction$.next(true);

    if (this.form.invalid) {
      this.snackBar.danger('Contém campo(s) inválido(s).');
      this.form.markAllAsTouched();
      this.cadastrandoAction$.next(false);

      return;
    }

    const model = { ...this.form.value };
    this.cidadeService.cadastrar(model)
      .pipe(
        tap((dados) => {
          if (dados.sucesso) {
            this.snackBar.success(dados.mensagem);
            this.dialogRef.close(true);
          } else {
            this.snackBar.danger(dados.mensagemCompleta || dados.mensagem);
          }
        }),
        finalize(() => { this.cadastrandoAction$.next(false); })
      ).subscribe();
  }
}
