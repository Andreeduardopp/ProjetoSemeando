import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { CardsComponent } from "./cards/cards.component";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { LoginComponent } from "./login/login.component";
import { CardSemanaComponent } from "./card-semana/card-semana.component";
import { DetalheEventoComponent } from "./detalhe-evento/detalhe-evento.component";


const routes: Routes = [
    {
        path: 'eventos',
        component: MainComponent,
        children: [
            {
                path: '', 
                redirectTo: 'principal',
                pathMatch: 'full'
            },
            {
                path: "principal",
                component: CardsComponent
            },
            {
                path: "semanais",
                component: CardSemanaComponent
            },
            {
                path: 'evento/:id',
                component: DetalheEventoComponent
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
