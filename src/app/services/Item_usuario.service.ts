import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Item_usuario } from "../models/Item_usuario";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Item_usuarioService {
  private url = `${base_url}/item_usuarios`;
  private listaCambio = new Subject<Item_usuario[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Item_usuario[]>(this.url)
  }
}