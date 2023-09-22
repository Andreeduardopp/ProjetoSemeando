import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  eventos: any[] = []
  evento: any
  eventosList: any[] = []
  search = new FormControl()
  httpParams = new HttpParams()
  token:any
  constructor(
    private requestService: RequestsService,
    private router: Router
  ) { }


  ngOnInit() {
  
  this.token = localStorage.getItem("access_token")

  }

  navPerfil(){
    this.router.navigate([`usuario/criarEvento/`])
  }

}
