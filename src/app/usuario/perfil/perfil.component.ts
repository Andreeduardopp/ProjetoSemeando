import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  botaoAtivo!: string
  token = localStorage.getItem("access_token")
  userId: any
  constructor(
    private requestService: RequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_PK')

  }

  abrePerfil() {
    if (this.userId){
      this.botaoAtivo = 'perfil';
      this.router.navigate([`usuario/perfil/${this.userId}`])}
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }

  abreEventos() {
    if (this.userId) {
      this.botaoAtivo = 'eventos-do-usuario';
      this.router.navigate([`usuario/eventos/`])
    }
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }

  criaEventos() {
    if (this.userId) {
      this.botaoAtivo = 'novo-evento';
      this.router.navigate([`usuario/criarEvento/`])
    }
    else {
      alert('Erro! Realize o login novamente por favor.')
    }
  }


  logout() {
    this.requestService.logout()
  }
  
  navPerfil(){
    this.router.navigate([`usuario/criarEvento/`])
  }
}
