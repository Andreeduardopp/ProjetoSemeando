import { Usuario } from "../usuario/usuario"

export class Evento {
    id!: number
    titulo!: string
    user!:Usuario
    categoria!:string
    data!: string
    dia_evento!: string
    mes_evento!: string
    ano_evento!: string
    hora_inicio!:any
    cep!:string
    cidade!:string
    rua!:string
    numero!:string
    descricao!:string
    data_postagem!: string
    foto_principal!: any
    valor_entrada!: string
}
