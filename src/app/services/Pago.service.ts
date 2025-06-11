import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Pago } from "../models/Pago";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private url = `${base_url}/pagos`;
  private listaCambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Pago[]>(this.url)
  }
}