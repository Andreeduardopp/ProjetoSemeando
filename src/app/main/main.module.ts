import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { CardSemanaComponent } from './card-semana/card-semana.component';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { DetalheUserComponent } from './detalhe-user/detalhe-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    CardsComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CardSemanaComponent,
    DetalheEventoComponent,
    DetalheUserComponent,
    LoaderComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MainRoutingModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
  ],
  exports:[
    CardsComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CardSemanaComponent,
    DetalheUserComponent,
    LoaderComponent
  ]
})
export class MainModule { }
