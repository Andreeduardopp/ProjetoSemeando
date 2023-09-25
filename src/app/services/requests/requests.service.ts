import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Evento } from 'src/app/models/evento/evento';
import { Usuario } from 'src/app/models/usuario/usuario';
import { APIresponse } from 'src/app/models/APIresponse/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  url = 'http://127.0.0.1:8000'
  accessToken = localStorage.getItem('access_token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  })

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  //---------------------------------Eventos--------------------------------------------------------------

  getEventos(params: HttpParams): Observable<any[]> {
    return this.httpClient.get<APIresponse>(`${this.url}/eventos/eventos/`, { params })
      .pipe(
        map(eventos => {
          return eventos.results.map((evento: Evento) => {
            let parts = evento.data.split('-');
            let ano = parts[0];
            let mes = parts[1];
            let dia = parts[2];
            return {
              id: evento.id,
              titulo: evento.titulo,
              user: evento.user,
              categoria: evento.categoria,
              data: evento.data,
              hora_inicio: evento.hora_inicio,
              dia_evento: dia,
              mes_evento: mes,
              ano_evento: ano,
              data_postagem: evento.data_postagem,
              foto_principal: evento.foto_principal,
              valor_entrada: evento.valor_entrada
            };
          });
        }
        )
      );
  }

  getPage() {
    return this.httpClient.get<APIresponse>(`${this.url}/eventos/eventos/`).pipe(
      map(data => {
        return data.count;
      })
    );
  }


  getEventosSemana(params: HttpParams): Observable<any[]> {
    return this.httpClient.get<APIresponse>(`${this.url}/eventos/eventos-da-semana/`, { params })
      .pipe(
        map(eventos => {
          return eventos.results.map((evento: Evento) => {
            let parts = evento.data.split('-');
            let ano = parts[0];
            let mes = parts[1];
            let dia = parts[2];
            return {
              id: evento.id,
              titulo: evento.titulo,
              user: evento.user,
              categoria: evento.categoria,
              data: evento.data,
              hora_inicio: evento.hora_inicio,
              dia_evento: dia,
              mes_evento: mes,
              ano_evento: ano,
              data_postagem: evento.data_postagem,
              foto_principal: evento.foto_principal,
              valor_entrada: evento.valor_entrada
            };
          });
        }
        )
      );
  }

  getPageSemana() {
    return this.httpClient.get<APIresponse>(`${this.url}/eventos/eventos-da-semana/`).pipe(
      map(data => {
        return data.count;
      })
    );
  }

  getEventoUser(params: HttpParams): Observable<any> {
    return this.httpClient.get<Evento[]>(`${this.url}/user/eventos/`, {params} )
    .pipe(
      map(eventos => {
        return eventos.map((evento: Evento) => {
          let parts = evento.data.split('-');
          let ano = parts[0];
          let mes = parts[1];
          let dia = parts[2];
          return {
            id: evento.id,
            titulo: evento.titulo,
            user: evento.user,
            categoria: evento.categoria,
            data: evento.data,
            hora_inicio: evento.hora_inicio,
            dia_evento: dia,
            mes_evento: mes,
            ano_evento: ano,
            data_postagem: evento.data_postagem,
            foto_principal: evento.foto_principal,
            valor_entrada: evento.valor_entrada
          };
        });
      }
      )
    );
  }

  getEvento(id: any): Observable<any> {
    return this.httpClient.get<Evento>(`${this.url}/eventos/eventos/${id}`)
  }

  putEvento(formData: FormData, id: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/eventos/eventos/${id}/`, formData)
  }

  getCategorias(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/eventos/categorias/`)
  }

  postEvento(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/eventos/eventos/`, formData);
  }

  deleteEvento(id: any) {
    return this.httpClient.delete<any>(`${this.url}/eventos/eventos/${id}`).subscribe(() => alert("evento excluido!"))
  }
  //---------------------------------lOGIN E AUTH--------------------------------------------------------------

  login(formData: FormData) {
    return this.httpClient.post<any>(`${this.url}/accounts/login/`, formData)
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_PK');
    this.router.navigate(['/login']);
  }

  cadastro(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/accounts/registration/`, formData)
  }


  verificaToken(token: any) {
    return this.httpClient.post<any>(`${this.url}/accounts/token/verify/`, { token })
  }

  renovaToken(): Observable<any> {
    let refreshToken = localStorage.getItem('refresh_token');
    return this.httpClient.post<any>(`${this.url}/accounts/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('access_token', response.access);
        } else {
          alert('Por favor, faça o login novamente');
          this.router.navigate(['/login']);
        }
      }),
    );
  }


  confirmarEmail(key: string): Observable<any> {
    const payload = { key };
    return this.httpClient.post<any>(
      `${this.url}/accounts/registration/verify-email/`,
      payload
    );
  }

  //---------------------------------Usuarios--------------------------------------------------------------

  getUsuario(id: number): Observable<any> {
    return this.httpClient.get<Usuario>(`${this.url}/usuarios/usuarios/${id}`)
  }

  putUsuario(formData: FormData, id: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/usuarios/usuarios/${id}/`, formData)
  }

}