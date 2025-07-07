<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { Rol } from '../../../models/Rol';
=======
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Roles } from '../../../models/Roles';
>>>>>>> Stashed changes
=======
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Roles } from '../../../models/Roles';
>>>>>>> Stashed changes
import { RolService } from '../../../services/Rol.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule,CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
<<<<<<< Updated upstream
export class ListarrolComponent {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3'];
=======
export class ListarrolComponent implements AfterViewInit {

  roles: Roles[] = [];
  rolesFiltrados: Roles[] = [];
  filtro: string = '';

  totalRegistros: number = 0;
  paginaActual = 0;
  pageSize = 4;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private rolService: RolService, private snackBar: MatSnackBar) {}
>>>>>>> Stashed changes

  constructor(private rolService: RolService) {}
  
  ngOnInit(): void {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    this.rolService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
        //Actualiza la tabla automaticamente
    this.rolService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

=======
=======
>>>>>>> Stashed changes
    this.rolService.list().subscribe((data: Roles[]) => {
      this.roles = data;
      this.rolesFiltrados = data;
      this.totalRegistros = data.length;
    });

    this.rolService.getList().subscribe((data: Roles[]) => {
      this.roles = data;
      this.rolesFiltrados = data;
      this.totalRegistros = data.length;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.paginator.page.subscribe(event => this.cambiarPagina(event));
    });
  }

  aplicarFiltro() {
    const f = this.filtro.trim().toLowerCase();
    this.rolesFiltrados = this.roles.filter(r =>
      r.id?.toString().includes(f) ||
      r.rol.toLowerCase().includes(f) 
    );
    this.totalRegistros = this.rolesFiltrados.length;
    this.paginaActual = 0;
    if (this.paginator) this.paginator.firstPage();
  }

  get rolesPaginados() {
    const start = this.paginaActual * this.pageSize;
    const end = start + this.pageSize;
    return this.rolesFiltrados.slice(start, end);
  }

  cambiarPagina(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.pageSize = event.pageSize;
  }

>>>>>>> Stashed changes
  eliminar(id: number) {
    this.rolService.deleteI(id).subscribe((data) => {
      this.rolService.list().subscribe((data) => {
        this.rolService.setList(data);
      });
    });
  }
}
