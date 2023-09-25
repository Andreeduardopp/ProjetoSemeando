import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { HttpParams } from '@angular/common/http'
import { Evento } from 'src/app/models/evento/evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  httpParams = new HttpParams()
  eventos: Evento[] = []
  evento!: Evento

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }

  ngOnInit() {
    let usuarioId = localStorage.getItem('user_PK');
    this.httpParams = this.httpParams.set('user_id', usuarioId!)
    this.requestService.getEventoUser(this.httpParams)
      .subscribe(eventos => {
        this.eventos = eventos
     })
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



