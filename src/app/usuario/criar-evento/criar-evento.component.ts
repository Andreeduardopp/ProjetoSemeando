import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.scss']
})
export class CriarEventoComponent implements OnInit {
  id: any = localStorage.getItem('user_PK');
  FormStep1!: FormGroup;
  FormStep2!: FormGroup;
  selectedFile!: any;
  imagePreviewUrl: any;
  url!: any
  categorias: any[] = []
  generos: any[] = []
  dataMinima = new Date().toISOString().split('T')[0];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private requestService: RequestsService,
    private router: Router

  ) { }

  ngOnInit() {
    this.FormStep1 = this.formBuilder.group({
      titulo: ['', Validators.required],
      data: ['', Validators.required],
      time: ['', Validators.required],
    });

    this.FormStep2 = this.formBuilder.group({
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      valor_entrada: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required]
    });

    this.requestService.getCategorias()
      .subscribe(data => {
        this.categorias = data
        this.categorias.forEach(categoria => {
          this.generos.push(categoria.nome)
        });
      })

    this.FormStep2.get('cep')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.buscarCep(val)
    })

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
    this.selectedFile = null; // Limpa a variável que guarda a imagem selecionada
    this.imagePreviewUrl = null
  }




  criarEvento() {
    if (this.FormStep1.valid && this.FormStep2.valid && this.selectedFile) {
      const id: any = parseInt(this.id)
      const formData = new FormData();
      formData.append('user', id);
      formData.append('titulo', this.FormStep1.value.titulo);
      formData.append('data', this.FormStep1.value.data);
      formData.append('hora_inicio', this.FormStep1.value.time);
      formData.append('descricao', this.FormStep2.value.descricao);
      formData.append('valor_entrada', this.FormStep2.value.valor_entrada);
      formData.append('categoria', this.FormStep2.value.categoria);
      formData.append('cep', this.FormStep2.value.cep);
      formData.append('rua', this.FormStep2.value.rua);
      formData.append('numero', this.FormStep2.value.numero);
      formData.append('cidade', this.FormStep2.value.cidade);
      formData.append('foto_principal', this.selectedFile, this.selectedFile.name);

      this.requestService.postEvento(formData).subscribe(
        (response) => {
          console.log('Evento criado:', response);
          this.FormStep1.reset();
          this.FormStep2.reset();
          this.selectedFile = null; // Limpa a imagem selecionada
          this.router.navigate(['eventos/principal'])
        },
        (error) => {
          alert('Erro ao criar evento, tente novamente');
        }
      );
    } else {
      alert('Formulário inválido. Verifique se todos os campos estão preenchidos corretamente.');
      this.FormStep1.markAllAsTouched(),
        this.FormStep2.markAllAsTouched()
    }
  }



  buscarCep(cep: string) {
    this.url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.httpClient.get<any>(this.url).subscribe(
      (dados) => {
        this.FormStep2.patchValue({
          rua: dados.logradouro,
          cidade: dados.localidade,
        })
      })
  }

}