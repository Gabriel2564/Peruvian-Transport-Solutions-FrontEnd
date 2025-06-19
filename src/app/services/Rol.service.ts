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
    return this.http.get<Rol[]>(`${this.url}/listar`)
  }

  insert(rol: Rol){
      return this.http.post(`${this.url}/insertar`, rol);
  }

  setList(listaNueva:Rol[]){
    this.listaCambio.next(listaNueva)
  }

  update(rol: Rol) {
    return this.http.put(`${this.url}/modificar`, rol);
  }

  deleteI(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/listar${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
