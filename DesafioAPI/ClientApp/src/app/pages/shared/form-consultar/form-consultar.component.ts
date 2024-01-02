import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConsultaCidadeForm } from '@models/cidade.model';
import { ConsultaClienteForm } from '@models/cliente.model';
import { FORM_MODULES } from '@pages/shared/form-modules';

type ConsultaForm = ConsultaClienteForm & ConsultaCidadeForm;

@Component({
  selector: 'app-form-consultar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ...FORM_MODULES,
  ],
  templateUrl: './form-consultar.component.html',
  styleUrls: ['./form-consultar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConsultarComponent implements OnInit {
  private _tipos: string[] = [];
  get tipos() { return this._tipos; }

  @Input('tiposConsulta') set tipos(tipos: string[]) {
    this._tipos = tipos;

    if (this.tipos.length) {
      this.form.patchValue({
        tipo: this.tipos[0]
      });
    } else {
      this.form.patchValue({
        tipo: ''
      });
    }
  }

  @Input('btnCadastrarText') btnText = 'Cadastrar';

  @Output('consultar') consultarEmit = new EventEmitter<ConsultaForm>();
  @Output('cadastrar') cadastrarEmit = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      tipo: ['', [Validators.required]],
      valor: ['', []],
    });
  }

  ngOnInit(): void {
    const { tipo, valor } = this.route.snapshot.queryParams;

    if (tipo) {
      this.form.patchValue({ tipo, valor });
      this.consultar();
    }
  }

  get tipo() { return this.form.get('tipo')?.value }

  consultar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const model = { ...this.form.value };
    model.valor = model.tipo == 'Id' && isNaN(+model.valor) ? '0' : model.valor;

    this.router.navigate([], { queryParams: model });
    this.consultarEmit.emit(model);
  }

  cadastrar() {
    this.cadastrarEmit.emit(true);
  }
}
