import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { CriarEventoComponent } from "./criar-evento/criar-evento.component";
import { EventosComponent } from "./eventos/eventos.component";
import { EditarEventoComponent } from "./editar-evento/editar-evento.component";
import { UserInfoComponent } from "./user-info/user-info.component";

const routes: Routes = [
    {
        path: 'usuario',
        component: PerfilComponent,
        children: [
            {
                path: 'perfil/:id',
                component: UserInfoComponent
            },
            {
                path: "eventos",
                component: EventosComponent
            },
            {
                path: "criarEvento",
                component: CriarEventoComponent,
                // canActivate: [ AuthGuard]
                
            },
            {
                path:"evento/:id", //o id do evento que se deseja editar
                component:EditarEventoComponent
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }
