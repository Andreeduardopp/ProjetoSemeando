import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpParams } from '@angular/common/http'
import { Evento } from 'src/app/models/evento/evento';
@Component({
  selector: 'app-card-semana',
  templateUrl: './card-semana.component.html',
  styleUrls: ['./card-semana.component.scss']
})
export class CardSemanaComponent implements OnInit {
  eventos: Evento[] = []
  evento!: Evento
  search = new FormControl()
  httpParams = new HttpParams()
  p: number = 1;
  page!:any


  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.httpParams = this.httpParams.set('search', val)
      this.buscarEventos()
    });
    this.buscarEventos()
  }

  onPageChange(event: any) {
    this.p = event;
    this.buscarEventos();
  }

  buscarEventos() {
    const currentPage = Math.ceil(this.p/2);
    this.httpParams = this.httpParams.set('page', currentPage.toString())
    this.requestService.getEventos(this.httpParams)
      .subscribe(eventos => {
        this.eventos = eventos.filter(it => this.capturaSemanais(it.data)).reverse()
      })
  }

  

  capturaSemanais(dataEvento: string) {
    const dataAtual = new Date();
    const dataEventoDate = new Date(dataEvento);
    var timeDiff = Math.abs(dataEventoDate.getTime() - dataAtual.getTime())
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays < 7
  }

  navegarParaDetalhes(eventoId: number) {
    this.router.navigate(['eventos/evento', eventoId])
  }
}


