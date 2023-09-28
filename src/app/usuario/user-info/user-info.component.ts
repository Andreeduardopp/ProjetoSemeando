import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Usuario } from 'src/app/models/usuario/usuario';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  usuario!: Usuario;
  usuarioForm!: FormGroup
  editar: boolean = false
  selectedFile!: any;
  imagePreviewUrl: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestsService,
    private formBuilder: FormBuilder

  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const usuarioId = params['id'];
      this.requestService.getUsuario(parseInt(usuarioId!))
        .subscribe(data => {
          this.usuario = data;
          this.selectedFile = this.usuario.foto_perfil
          this.imagePreviewUrl = this.usuario.foto_perfil
          this.initializeForms();
        });
    });
  }

  initializeForms() {
    this.usuarioForm = this.formBuilder.group({
      username: [this.usuario.username, Validators.required],
      nome: [this.usuario.first_name, Validators.required],
      categoria: [this.usuario.last_name, Validators.required],
      bio: [this.usuario.bio, Validators.required],
      contato: [this.usuario.celular, Validators.required],
      email: [this.usuario.email, Validators.required],
      foto: ['']
    })
  }

  editarInfo() {
    this.editar = !this.editar
  }
  fecharEditar() {
    this.editar = !this.editar
    location.reload();
  }

  salvarInfo() {
    if (this.usuarioForm.valid) {
      const formData = new FormData();
      formData.append('username', this.usuarioForm.value.username);
      formData.append('first_name', this.usuarioForm.value.nome);
      formData.append('last_name', this.usuarioForm.value.categoria);
      formData.append('email', this.usuarioForm.value.email);
      formData.append('bio', this.usuarioForm.value.bio);
      formData.append('celular', this.usuarioForm.value.contato);
      if (this.selectedFile?.name) {
        formData.append('foto_perfil', this.selectedFile, this.selectedFile.name)
      };
      this.requestService.putUsuario(formData, this.usuario.id).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Informações editadas com sucesso',
            showConfirmButton: false,
            timer: 1500
          });
          this.editar = false
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao editar o usuario!',
            footer: '<a href="/contato">Precisa de ajuda?</a>'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.',
      })
      this.usuarioForm.markAllAsTouched(),
        this.usuarioForm.markAllAsTouched()
    }
  }

  onFileSelected(event: NgxDropzoneChangeEvent) {
    if (event && event.addedFiles && event.addedFiles.length > 0) {
      const file: File = event.addedFiles[0] as File;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedFile = file;
        this.imagePreviewUrl = reader.result as string; // Armazene o URL de dados
      };
    }
  }

  removeImage() {
    this.usuarioForm.get('foto')?.setValue(null); // Limpa o controle do formulário
    this.selectedFile = null; // Limpa a variável que guarda a imagem selecionada
    this.imagePreviewUrl = null
  }

}
