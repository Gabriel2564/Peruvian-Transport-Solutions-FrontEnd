import { Component, OnInit,AfterViewInit,viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Viaje } from '../../../models/Viaje';
import { ViajeService } from '../../../services/Viaje.service';
import {  MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-listarviaje',
  imports: [
    MatTableModule, 
    MatIconModule, 
    CommonModule, 
    RouterLink, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatPaginatorModule],
  templateUrl: './listarviaje.component.html',
  styleUrl: './listarviaje.component.css'
})
export class ListarviajeComponent implements AfterViewInit {
   dataSource: MatTableDataSource<Viaje> = new MatTableDataSource<Viaje>();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];
   viajeFiltro: string = '';
   @ViewChild(MatPaginator) paginator!: MatPaginator; 

   constructor(private vS: ViajeService) {}

   ngOnInit(): void {
    this.vS.list().subscribe((data:Viaje[]) => {
      this.dataSource = new MatTableDataSource<Viaje>(data);
      this.dataSource=new MatTableDataSource<Viaje>(data);
      this.dataSource.filterPredicate = (data: Viaje, filter: string) => {
        const f =filter.trim().toLowerCase();
        return data.priceViaje.toString().includes(f)
          || data.departureDateViaje.toLowerCase().includes(f)
          || data.idViaje.toString().includes(f)
          || data.ruta.idRuta.toString().includes(f);  
      };
    });
    this.vS.getList().subscribe((data:Viaje[]) => {
      this.dataSource = new MatTableDataSource<Viaje>(data);
      this.dataSource.filterPredicate = (data: Viaje, filter: string) => {
        const f =filter.trim().toLowerCase();
        return data.priceViaje.toString().includes(f)
          || data.departureDateViaje.toLowerCase().includes(f)
          || data.idViaje.toString().includes(f)
          || data.ruta.idRuta.toString().includes(f);  
      };
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  aplicarFiltro() {
    this.dataSource.filter = this.viajeFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
 }
    eliminar(id: number) {
    this.vS.deleteI(id).subscribe(data => {
      this.vS.list().subscribe(data => {
        this.vS.setList(data);
      });
    });
  }
}

