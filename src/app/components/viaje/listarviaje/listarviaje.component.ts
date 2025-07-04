import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Viaje } from '../../../models/Viaje';
import { ViajeService } from '../../../services/Viaje.service';
import {  MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listarviaje',
  imports: [MatTableModule, MatIconModule, CommonModule, RouterLink, MatButtonModule, MatSnackBarModule], 
  templateUrl: './listarviaje.component.html',
  styleUrl: './listarviaje.component.css'
})
export class ListarviajeComponent implements OnInit {
   dataSource: MatTableDataSource<Viaje> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];

   constructor(private vS: ViajeService,     private snackBar: MatSnackBar   ) {}

   ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

     eliminar(id: number) {
    this.vS.deleteI(id).subscribe({
      next: () => {
        // Refresca la tabla tras borrado exitoso
        this.vS.list().subscribe(list => {
          this.vS.setList(list);
        });
      },
      error: err => {
        // Muestra snackbar en rojo si hay error de integridad referencial
        this.snackBar.open(
          'No se puede eliminar, este viaje está enlazado con otra entidad.',
          'Cerrar',
          { duration: 4000, panelClass: ['snack-error'] }
        );
      }
    });
  }
}

