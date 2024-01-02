import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CidadeService } from 'src/app/services/cidade.service';
import { BehaviorSubject, Observable, finalize, map, tap } from 'rxjs';
import { Cidade } from 'src/app/models/cidade.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FORM_MODULES } from '@pages/shared/form-modules';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  selector: 'app-cadastrar-cliente-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ...FORM_MODULES,
  ],
  templateUrl: './cadastrar-cliente-dialog.component.html',
  styleUrls: ['./cadastrar-cliente-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastrarClienteDialogComponent implements OnInit {
  form: FormGroup;

  maxDate = new Date(+new Date());
  sexos = ['Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'];

  cidades$?: Observable<Cidade[]>;

  private cadastrandoAction$ = new BehaviorSubject<boolean>(false);
  public cadastrando$ = this.cadastrandoAction$.asObservable();

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarClienteDialogComponent>,
    private cidadeService: CidadeService,
    private clienteService: ClienteService,
    private snackBar: SnackBarService,
  ) {
    this.form = fb.group({
      nome: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      dataNascimento: ['', Validators.required],
      outroQual: ['', []],
      cidadeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cidades$ = this.cidadeService.consultarPor('Nome', '')
      .pipe(map((dados) => dados.resultado || []));
  }

  get sexoSelecionado() { return this.form.get('sexo')?.value; }

  onChangeSexo(sexo: string) {
    const control = this.form.get('outroQual');

    if (sexo === 'Outro') {
      control?.setValidators([Validators.required]);
    } else {
      control?.clearValidators();
    }

    control?.updateValueAndValidity();
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
    if (model.sexo === 'Outro') {
      model.sexo += ': ' + model.outroQual;
      delete model.outroQual;
    }

    this.clienteService.cadastrar(model)
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
