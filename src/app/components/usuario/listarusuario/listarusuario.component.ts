import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/Usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-listarusuario',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css']
})
export class ListarusuarioComponent implements OnInit {

  usDataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  usFiltro: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data: Usuario[]) => {
      this.usDataSource = new MatTableDataSource<Usuario>(data);
      this.usDataSource.filterPredicate = (data: Usuario, filter: string) => {
        const f = filter.trim().toLowerCase();
        return data.username.toLowerCase().includes(f);
      };
    });

    this.uS.getList().subscribe((data: Usuario[]) => {
      this.usDataSource = new MatTableDataSource<Usuario>(data);
      this.usDataSource.filterPredicate = (data: Usuario, filter: string) => {
        const f = filter.trim().toLowerCase();
        return data.username.toLowerCase().includes(f);
      };
    });
  }

  ngAfterViewInit() {
     setTimeout(() => {
    this.usDataSource.paginator = this.paginator;
    });
  }

  usAplicarFiltro() {
    this.usDataSource.filter = this.usFiltro.trim().toLowerCase();
    
  }

  eliminar(id: number) {
    this.uS.deleteA(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.usDataSource.data = data;
      });
    });
  }
}
