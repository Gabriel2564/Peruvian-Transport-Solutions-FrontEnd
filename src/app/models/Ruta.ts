import { Item } from "./Item"

export class Ruta{
    idRuta: number = 0
    startLocationRuta: string = ""
    finalLocationRuta: string = ""
    startLongitudeRuta: string = ""
    finalLongitudeRuta: string = ""
    startLatitudeRuta: string = ""
    finalLatitudeRuta: string = ""
    item: Item = new Item()
}