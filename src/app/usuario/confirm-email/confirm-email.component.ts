import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {
  emailConfimed = false;
  message = '';
  constructor(
    private requestService :RequestsService,  
    private activatedRoute: ActivatedRoute,
    private router: Router 
    ) {
  }

  ngOnInit(): void {
    const key = this.activatedRoute.snapshot.params['key'];
    this.requestService.confirmarEmail(key)
      .subscribe({
        next: (value) => {
          // Em caso de sucesso, o e-mail já está confirmado e esta variável pode ser usada no html para mostrar uma mensagem de sucesso e algum link para redirecioanar para o login
          this.emailConfimed = true;
          alert('e-mail confirmado com sucesso')
          this.router.navigate(['usuario/perfil']);
        },
        error: (error) => {
          // Em caso de erro, esta variável pode ser usada no html para mostrar uma mensagem de erro
          this.emailConfimed = false;
          alert('Erro ao confirmar o e-mail!')
          this.router.navigate(['principal']);
        }
      })
  }

}
