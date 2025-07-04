import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Item_usuario } from '../../../models/Item_usuario';
import { Item_usuarioService } from '../../../services/Item_usuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listaritemusuario',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule,MatSnackBarModule],
  templateUrl: './listaritemusuario.component.html',
  styleUrl: './listaritemusuario.component.css'
})
export class ListaritemusuarioComponent {
  dataSource: MatTableDataSource<Item_usuario> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];

  constructor(private iuS: Item_usuarioService,    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.iuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.iuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.iuS.deleteI(id).subscribe({
      next: () => {
        // Refresca la tabla tras borrado exitoso
        this.iuS.list().subscribe(list => {
          this.iuS.setList(list);
        });
      },
      error: err => {
        // Muestra snackbar en rojo si hay error de integridad referencial
        this.snackBar.open(
          'No se puede eliminar, este item_usuario está enlazado con otra entidad.',
          'Cerrar',
          { duration: 4000, panelClass: ['snack-error'] }
        );
      }
    });
  }
}
