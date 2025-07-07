import { Usuarios } from "./Usuarios"
import { Viaje } from "./Viaje"

export class Resenia{
    idResenia: number = 0
    publicationDateResenia: string = ""
    likesResenia: number = 0
    contentResenia: string = ""
    usuario: Usuarios = new Usuarios()
    viaje: Viaje = new Viaje()
}