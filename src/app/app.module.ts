import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrincipalComponent } from './principal/principal.component';
import { BottomComponent } from './bottom/bottom.component';
import { FooterComponent } from './footer/footer.component';
import { PastelComponent } from './graficos/pastel/pastel.component';
import { BarraComponent } from './graficos/barra/barra.component';
import { DonaComponent } from './graficos/dona/dona.component';


// Datepcker
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

// Charts
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PrincipalComponent,
    BottomComponent,
    FooterComponent,
    PastelComponent,
    BarraComponent,
    DonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
