import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetalheUserComponent } from '../detalhe-user/detalhe-user.component';
import { Usuario } from 'src/app/models/usuario/usuario';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.scss']
})
export class DetalheEventoComponent implements OnInit {
  evento: any;
  usuario!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const eventoId = params['id'];
      this.requestService.getEvento(eventoId)
        .subscribe(data => {
          this.evento = data;
        })
    });
  }

  getGoogleMapsLink(cep: string): string {
    const formattedCep = cep.replace(/\s+/g, '+');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedCep}`;
    return googleMapsUrl;
  }

  openModalWithComponent() {
    const usuarioId = this.evento.user.id;
    this.requestService.getUsuario(usuarioId)
      .subscribe(data => {
        console.log(data);
        this.usuario = data;
        
        this.bsModalRef = this.modalService.show(
          DetalheUserComponent,
          {
            class: 'modal-arredondada',
            initialState: {
              usuario: this.usuario 
            }
          }
        );
        this.bsModalRef.content.closeBtnName = 'Close';
      });
  }
}

