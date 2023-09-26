import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { CardsComponent } from './main/cards/cards.component';
import { LoginComponent } from './main/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { ConfirmEmailComponent } from './usuario/confirm-email/confirm-email.component';
import { DetalheUserComponent } from './main/detalhe-user/detalhe-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/eventos/principal', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "organizador", component: DetalheUserComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "confirm-email/:key", component: ConfirmEmailComponent },
  {
    path: "main", component: MainComponent,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {
    path: "perfil", component: PerfilComponent,
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
