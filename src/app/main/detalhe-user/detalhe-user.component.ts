import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/models/usuario/usuario';

@Component({
  selector: 'app-detalhe-user',
  templateUrl: './detalhe-user.component.html',
  styleUrls: ['./detalhe-user.component.scss']
})
export class DetalheUserComponent {

  @Input() usuario!: Usuario;

  constructor(
    public bsModalRef: BsModalRef,
  ) { }



}
