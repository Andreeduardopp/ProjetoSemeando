import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  repeatPasswordType: boolean = false;
  form!: FormGroup;
  fieldTextType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private requestService: RequestsService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  accountRegister(username: string, email: string, password1: string, password2: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password1);
    formData.append('password2', password2);
    
    this.requestService.cadastro(formData).pipe(
      catchError(() => {
        alert('Verifique se todos os campos estão preenchidos corretamente.');
        return throwError('Erro ocorreu'); // Retorna um erro para parar a cadeia de observação
      })
    ).subscribe(
      (response) => {
        console.log(response)
        if (response) {
          alert('Por favor, confirme seu e-mail pelo link enviado no e-mail cadastrado.')
          this.form.reset()
          this.router.navigate(['usuario/perfil'])}
        else {
          alert('Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.');
          this.form.markAllAsTouched()
        }
      })
  }

  togglePasswordVisibility() {
    if (this.fieldTextType) { this.fieldTextType = false }
    else {
      this.fieldTextType = true
    }
  }
  toggleRepeatPasswordVisibility() {
    if (this.repeatPasswordType) { this.repeatPasswordType = false }
    else {
      this.repeatPasswordType = true
    }
  }
}
function throwError(arg0: string): any {
  throw new Error('Function not implemented.');
}

