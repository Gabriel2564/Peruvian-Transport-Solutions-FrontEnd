import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../../../models/Bus';
import { BusService } from '../../../services/Bus.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarbus',
  imports: [MatTableModule, CommonModule, MatIconModule,RouterLink,MatButtonModule,MatSnackBarModule],
  templateUrl: './listarbus.component.html',
  styleUrl: './listarbus.component.css'
})
export class ListarbusComponent implements OnInit{
  dataSource: MatTableDataSource<Bus> = new MatTableDataSource();
  displayedColumns: string[]=["bus1","bus2","bus3","bus4","bus5","bus6","bus7"]

  constructor(private bS:BusService,     private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.bS.list().subscribe((data) =>{
      this.dataSource = new MatTableDataSource(data);
    });
    this.bS.getList().subscribe((data) =>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

     eliminar(id: number) {
    this.bS.deleteI(id).subscribe({
      next: () => {
        // Refresca la tabla tras borrado exitoso
        this.bS.list().subscribe(list => {
          this.bS.setList(list);
        });
      },
      error: err => {
        // Muestra snackbar en rojo si hay error de integridad referencial
        this.snackBar.open(
          'No se puede eliminar, este bus está enlazado con otra entidad.',
          'Cerrar',
          { duration: 4000, panelClass: ['snack-error'] }
        );
      }
    });
  }
}
