import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpParams } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  p: number = 1;
  userId = localStorage.getItem('user_PK')
  editar: boolean = false
  eventos: any[] = []
  evento: any
  search = new FormControl()
  httpParams = new HttpParams()
  page!:any

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }

  navegarParaDetalhes(eventoId: number) {
    this.router.navigate(['eventos/evento', eventoId])
    console.log('entrou')
  }

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
        this.eventos = eventos.reverse()
      })
  }
}