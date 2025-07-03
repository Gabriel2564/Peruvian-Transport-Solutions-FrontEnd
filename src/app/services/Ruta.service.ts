import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Ruta } from "../models/Ruta";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  private url = `${base_url}/rutas`;
  private listaCambio = new Subject<Ruta[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Ruta[]>(`${this.url}/listar`)
  }
}