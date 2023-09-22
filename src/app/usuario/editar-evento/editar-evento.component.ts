import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { HttpClient, } from '@angular/common/http';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {
  evento: any;
  FormStep1!: FormGroup;
  FormStep2!: FormGroup;
  selectedFile!: any;
  imagePreviewUrl: any;
  url!: any
  categorias: any[] = []
  generos: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private requestService: RequestsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const eventoId = params['id'];
      this.requestService.getEvento(eventoId)
        .subscribe(data => {
          this.evento = data;
          this.selectedFile = this.evento.foto_principal
          this.imagePreviewUrl = this.evento.foto_principal
          this.initializeForms();
        })
    })

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


  initializeForms() {
    this.FormStep1 = this.formBuilder.group({
      titulo: [this.evento.titulo, Validators.required],
      data: [this.evento.data, Validators.required],
      time: [this.evento.hora_inicio, Validators.required],
    });

    this.FormStep2 = this.formBuilder.group({
      categoria: [this.evento.categoria, Validators.required],
      descricao: [this.evento.descricao, Validators.required],
      valor_entrada: [this.evento.valor_entrada, Validators.required],
      cep: [this.evento.cep, Validators.required],
      rua: [this.evento.rua, Validators.required],
      numero: [this.evento.numero, Validators.required],
      cidade: [this.evento.cidade, Validators.required],
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




  editarEvento() {
    if (this.FormStep1.valid && this.FormStep2.valid) {
      const formData = new FormData();
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
      if (this.selectedFile?.name) {
        formData.append('foto_principal', this.selectedFile, this.selectedFile.name)
      };
      this.requestService.putEvento(formData, this.evento.id).subscribe(
        (response) => {
          console.log('Evento editado com sucesso:', response);
          this.router.navigate(['usuario/eventos'])
        },
        (error) => {
          console.log('Erro ao editar o evento:', error);
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