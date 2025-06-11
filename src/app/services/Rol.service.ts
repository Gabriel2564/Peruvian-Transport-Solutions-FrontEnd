import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Rol } from "../models/Rol";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Rol[]>(this.url)
  }
}