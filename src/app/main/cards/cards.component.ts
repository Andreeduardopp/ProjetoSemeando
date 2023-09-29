import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { FormControl } from '@angular/forms'
import { catchError, debounceTime, distinctUntilChanged, throwError } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Evento } from 'src/app/models/evento/evento';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  p: number = 1;
  userId = localStorage.getItem('user_PK')
  editar: boolean = false
  eventos: Evento[] = []
  evento!: Evento
  search = new FormControl()
  httpParams = new HttpParams()
  page!:any
  pages:any
  loading:boolean = false

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
    this.requestService.getPage().subscribe(count => {
      this.pages = count;
    });
  }

  onPageChange(event: any) {
    this.p = event;
    this.buscarEventos();
  }

  buscarEventos() {
    this.loading = true;
    const currentPage = this.p;
    this.httpParams = this.httpParams.set('page', currentPage.toString())
    this.requestService.getEventos(this.httpParams)
      .subscribe(eventos => {
        this.loading = false
        this.eventos = eventos
        console.log(eventos)
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading = false
        return throwError(error);
      })
  }
}