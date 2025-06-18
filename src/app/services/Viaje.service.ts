import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Viaje } from "../models/Viaje";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private url = `${base_url}/viajes`;
  private listaCambio = new Subject<Viaje[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Viaje[]>(this.url)
  }
}