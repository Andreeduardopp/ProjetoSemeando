export class Usuario {
    nome: string;
    email: string;
    bio: string;
    celular: string;
    foto_perfil: string;
    foto_background: string;
  
    constructor(
      nome: string,
      email: string,
      bio: string,
      celular: string,
      foto_perfil: string,
      foto_background: string
    ) {
      this.nome = nome;
      this.email = email;
      this.bio = bio;
      this.celular = celular;
      this.foto_perfil = foto_perfil;
      this.foto_background = foto_background;
    }
  }  