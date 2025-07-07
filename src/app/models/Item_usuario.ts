import { Item } from "./Item"
import { Usuarios } from "./Usuarios"

export class Item_usuario{
    idItemUsuario: number = 0
    travelQualificationItemUsuario: number = 0
    travelDateItemUsuario: string = ""
    item: Item = new Item()
    usuario: Usuarios = new Usuarios()
}