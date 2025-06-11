import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Resenia } from "../models/Resenia";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class ReseniaService {
  private url = `${base_url}/resenias`;
  private listaCambio = new Subject<Resenia[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Resenia[]>(this.url)
  }
}