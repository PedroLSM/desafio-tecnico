import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCidadesComponent } from './page-cidades/page-cidades.component';


const routes: Routes = [
    { path: '', title: 'Desafio Técnico - Cidades', component: PageCidadesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CidadesRoutingModule { }

@NgModule({
    imports: [
        CidadesRoutingModule,
    ],
})
export class CidadesModule { }