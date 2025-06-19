import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from '../../../services/Usuario.service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-listarusuario',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatListModule
  ],
changeDetection: ChangeDetectionStrategy.Default,

  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  
  constructor(private uS:UsuarioService){}


  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
this.uS.deleteA(id).subscribe(() => {
       // Filtrar la lista actual y actualizar el datasource sin recargar
    const nuevaLista = this.dataSource.data.filter(u => u.id !== id);
    this.dataSource.data = nuevaLista;
    });
 }
}

