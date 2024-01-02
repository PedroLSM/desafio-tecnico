import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageClientesComponent } from './page-clientes/page-clientes.component';


const routes: Routes = [
    { path: '', title: 'Desafio Técnico - Clientes', component: PageClientesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientesRoutingModule { }

@NgModule({
    imports: [
        ClientesRoutingModule,
    ],
})
export class ClientesModule { }