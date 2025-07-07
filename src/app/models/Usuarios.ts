import { Roles } from "./Roles"

export class Usuarios{
    idUsuario: number = 0
    usNombre: string = ""
    usApellido: string = ""
    usFecNacimiento: string=""
    usCorreo: string=""
    username:string=""
    password:string=""
    usEnable:boolean = false;
    roles: Roles =new Roles();
}