import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/Usuario.service';

@Component({
  standalone: true,
  selector: 'app-listarusuario',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {

  usuarios: Usuario[] = [];  // ahora un simple array para ngFor

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminar(id: number) {
    this.uS.deleteA(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.usuarios = data;
      });
    });
  }
}
