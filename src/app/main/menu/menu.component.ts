import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  token = localStorage.getItem("access_token")
  menuOpen = false;
  constructor(
    private router: Router 
    ){}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  abrePerfil(){
    let id = localStorage.getItem("user_PK")
    console.log(id)
    this.router.navigate([`usuario/perfil/${id}`])
  }
}
