import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Subject } from "rxjs";
import { Rol } from "../models/Rol";
=======
import { Observable, Subject } from "rxjs";
import {  Roles } from "../models/Roles";
>>>>>>> Stashed changes
=======
import { Observable, Subject } from "rxjs";
import {  Roles } from "../models/Roles";
>>>>>>> Stashed changes
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Roles[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Roles[]>(`${this.url}/listar`)
  }

  insert(rol: Roles){
      return this.http.post(`${this.url}/insertar`, rol);
  }

  setList(listaNueva:Roles[]){
    this.listaCambio.next(listaNueva)
  }

  update(rol: Roles) {
    return this.http.put(`${this.url}/modificar`, rol);
  }

  deleteI(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Roles>(`${this.url}/listar${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
