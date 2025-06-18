import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Item } from "../models/Item";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = `${base_url}/items`;
  private listaCambio = new Subject<Item[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Item[]>(this.url)
  }
}