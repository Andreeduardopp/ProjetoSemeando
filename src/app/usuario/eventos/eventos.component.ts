import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  httpParams = new HttpParams()
  eventos: any[] = []
  evento: any

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.requestService.getEventos(this.httpParams)
      .subscribe(eventos => {
        this.eventos = eventos.filter(it => this.eventosUser(it.user))
     })
  }

  eventosUser(user: any) {
    let usuarioId = localStorage.getItem('user_PK');
    if (!usuarioId) {
      alert('Por favor, realize o login novamente.');
      this.router.navigate(['/login']);
      return false; // Retorna false para indicar que não há usuário logado.
    }

    if (!user || user.id === null) {
      return false; // Retorna false se o objeto user for nulo ou user.id for nulo.
    }

    return parseInt(usuarioId) === parseInt(user.id);
  }


  editarEvento(eventoId: number,e: MouseEvent) {
    const { target } = e;

    if ((target as HTMLElement).closest('.delete-button')) {
        return;
    }

    this.router.navigate(['usuario/evento', eventoId])
  }

  deletarEvento(eventoId: number){
    let usuarioId = localStorage.getItem('user_PK');
    const confirmacao = window.confirm('Tem certeza de que deseja deletar este evento?');

    if (confirmacao) {
      this.requestService.deleteEvento(eventoId);
      this.router.navigate([`usuario/perfil/${usuarioId}`])
    }
  }
}



