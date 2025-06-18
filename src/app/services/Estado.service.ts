import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Estado } from "../models/Estado";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private url = `${base_url}/estados`;
  private listaCambio = new Subject<Estado[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Estado[]>(this.url)
  }
}