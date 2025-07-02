import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/Estado.service';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarestado',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './listarestado.component.html',
  styleUrl: './listarestado.component.css'
})
export class ListarestadoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Estado> = new MatTableDataSource<Estado>();
  estadofiltro: string = '';
  
  @ViewChild(MatPaginator)
  esPaginator!: MatPaginator;

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.list().subscribe((data: Estado[]) => {
      this.dataSource = new MatTableDataSource<Estado>(data);
      this.dataSource.filterPredicate = (estado, filter) =>
        estado.statusTypeEstado.toLowerCase().includes(filter.trim().toLowerCase());
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.esPaginator;
    });
  }

  aplicarFiltro() {
    this.dataSource.filter = this.estadofiltro.trim().toLowerCase();
  }

  eliminar(id: number) {
    this.estadoService.deleteP(id).subscribe(() => {
      this.estadoService.list().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }
}
