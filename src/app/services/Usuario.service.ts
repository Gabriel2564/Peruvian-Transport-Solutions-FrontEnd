import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Usuarios } from "../models/Usuarios";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Usuario[]>(this.url)
  }
}
=======
=======
>>>>>>> Stashed changes

  private listaCambio = new Subject<Usuarios[]>();

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Usuarios[]>(`${this.url}/listar`)
  }
  
  insert(u:Usuarios){
    return this.http.post(`${this.url}/insertar`, u);
  }
  setList(listaNueva:Usuarios[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number) {
    return this.http.get<Usuarios>(`${this.url}/listar/${id}`);
  }

  update(u: Usuarios) {
    return this.http.put(`${this.url}/modificar`, u);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 
}
>>>>>>> Stashed changes
