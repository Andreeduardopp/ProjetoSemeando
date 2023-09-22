import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private requestService: RequestsService,
  ) { }

  canActivate(): Observable<boolean> {
    let accessToken = localStorage.getItem('access_token');
    return this.requestService.verificaToken(accessToken)
      .pipe(
        map((response) => {
          if (response.detail) {
            alert(response.detail);
            return false;
          } else {
            return true;
          }
        })
      )
  }
}

