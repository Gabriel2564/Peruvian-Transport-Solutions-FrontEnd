import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/Estado.service';
import { MatInputModule } from '@angular/material/input';

import { MatToolbarModule } from '@angular/material/toolbar'; 

@Component({
  selector: 'app-listarestado',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule 
  ],
  templateUrl: './listarestado.component.html',
  styleUrl: './listarestado.component.css'
})
export class ListarestadoComponent implements OnInit {
  dataSource: MatTableDataSource<Estado> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.estadoService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.estadoService.deleteP(id).subscribe(() => {
      this.estadoService.list().subscribe(data => {
        this.estadoService.setList(data);
      });
    });
  }
}
