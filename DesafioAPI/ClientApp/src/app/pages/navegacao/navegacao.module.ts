import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
    imports: [
        HeaderComponent,
        FooterComponent,
        MainComponent,
        SidenavComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MainComponent,
        SidenavComponent,
    ],
    declarations: [],
    providers: [],
})
export class NavegacaoModule { }
