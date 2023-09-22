import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { PerfilComponent } from './perfil/perfil.component';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { MainModule } from '../main/main.module';
import { MatStepperModule } from '@angular/material/stepper'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CadastroComponent,
    PerfilComponent,
    CriarEventoComponent,
    EventosComponent,
    EditarEventoComponent,
    UserInfoComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MainModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgxDropzoneModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    UsuarioRoutingModule,
    ],
  exports:[
    CadastroComponent,
    PerfilComponent,
    CriarEventoComponent,
    EditarEventoComponent,
    UserInfoComponent,
    ConfirmEmailComponent
  ],
  providers: []
  
})
export class UsuarioModule { }
