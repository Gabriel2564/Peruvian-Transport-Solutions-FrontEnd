import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Asiento } from '../../../models/Asiento';
import { AsientoService } from '../../../services/Asiento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarasiento',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule,MatSnackBarModule],
  templateUrl: './listarasiento.component.html',
  styleUrl: './listarasiento.component.css'
})
export class ListarasientoComponent implements OnInit{
  dataSource: MatTableDataSource<Asiento> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];

   constructor(private aS: AsientoService,    private snackBar: MatSnackBar) {}

   ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    
  }

  eliminar(id: number) {
    this.aS.deleteI(id).subscribe({
      next: () => {
        // Refresca la tabla tras borrado exitoso
        this.aS.list().subscribe(list => {
          this.aS.setList(list);
        });
      },
      error: err => {
        // Muestra snackbar en rojo si hay error de integridad referencial
        this.snackBar.open(
          'No se puede eliminar, este asiento está enlazado con otra entidad.',
          'Cerrar',
          { duration: 4000, panelClass: ['snack-error'] }
        );
      }
    });
  }
}
