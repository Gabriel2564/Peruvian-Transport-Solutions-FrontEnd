import { Rol } from "./Rol"

export class Usuario{
    id: number = 0
    username: string = ""
    password: string = ""
    enabled: Boolean = false
    roles: Rol[] = []; // inicializado para evitar undefined
}