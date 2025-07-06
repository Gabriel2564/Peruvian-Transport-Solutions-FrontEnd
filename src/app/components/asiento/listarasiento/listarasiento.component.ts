import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asiento } from '../../../models/Asiento';
import { AsientoService } from '../../../services/Asiento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarasiento',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './listarasiento.component.html',
  styleUrl: './listarasiento.component.css'
})
export class ListarasientoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Asiento> = new MatTableDataSource();
  filtro: string = '';
  totalRegistros: number = 0;

  paginaActual = 0;
  pageSize = 4;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private asientoService: AsientoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.asientoService.list().subscribe((data: Asiento[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (asiento, filter) => {
        const f = filter.trim().toLowerCase();
        return asiento.idAsiento.toString().includes(f) ||
               asiento.seatNumberAsiento.toString().includes(f) ||
               asiento.bus?.idBus.toString().includes(f) ||
               asiento.estado?.statusTypeEstado.toLowerCase().includes(f);
      };
      this.totalRegistros = data.length;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
    this.totalRegistros = this.dataSource.filteredData.length;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    this.asientoService.deleteI(id).subscribe({
      next: () => {
        this.asientoService.list().subscribe((data) => {
          this.dataSource.data = data;
          this.totalRegistros = data.length;
          this.snackBar.open('Asiento eliminado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        });
      },
      error: () => {
        this.snackBar.open(
          'No se puede eliminar: este asiento está enlazado con otra entidad.',
          'Cerrar',
          { duration: 4000, panelClass: ['snack-error'] }
        );
      }
    });
  }

  get asientosPaginados() {
    const start = this.paginaActual * this.pageSize;
    const end = start + this.pageSize;
    return this.dataSource.filteredData.slice(start, end);
  }

  cambiarPagina(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
