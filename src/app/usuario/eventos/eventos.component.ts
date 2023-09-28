import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { HttpParams } from '@angular/common/http'
import { Evento } from 'src/app/models/evento/evento';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  httpParams = new HttpParams()
  eventos: Evento[] = []
  evento!: Evento
  loading:boolean = false

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true
    let usuarioId = localStorage.getItem('user_PK');
    this.httpParams = this.httpParams.set('user_id', usuarioId!)
    this.requestService.getEventoUser(this.httpParams)
      .subscribe(eventos => {
        this.loading = false
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

  deletarEvento(eventoId: number) {
    let usuarioId = localStorage.getItem('user_PK');
    Swal.fire({
      title: 'Deseja deletar o evento?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Evento deletado!', '', 'error')
        this.requestService.deleteEvento(eventoId);
        this.router.navigate([`usuario/perfil/${usuarioId}`])
      }
    });
  }
}



