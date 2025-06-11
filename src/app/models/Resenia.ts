import { Usuario } from "./Usuario"
import { Viaje } from "./Viaje"

export class Resenia{
    idResenia: number = 0
    publicationDateResenia: string = ""
    likesResenia: number = 0
    contentResenia: string = ""
    usuario: Usuario = new Usuario()
    viaje: Viaje = new Viaje()
}