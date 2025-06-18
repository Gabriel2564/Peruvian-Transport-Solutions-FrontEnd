import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Asiento } from "../models/Asiento";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
    providedIn: 'root',
})

export class AsientoService{
    private url = `${base_url}/asientos`;
    private listaCambio = new Subject<Asiento[]>()
    constructor(private http:HttpClient){}

    list(){
      return this.http.get<Asiento[]>(this.url)
    }
}