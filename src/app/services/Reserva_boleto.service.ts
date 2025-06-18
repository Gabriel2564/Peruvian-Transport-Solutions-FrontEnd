import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Reserva_boleto } from "../models/Reserva_boleto";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class ReservaBoletoService {
  private url = `${base_url}/reserva_boletos`;
  private listaCambio = new Subject<Reserva_boleto[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Reserva_boleto[]>(this.url)
  }
}