import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Asiento } from '../../../models/Asiento';
import { AsientoService } from '../../../services/Asiento.service';

@Component({
  selector: 'app-listarasiento',
  imports: [MatTableModule],
  templateUrl: './listarasiento.component.html',
  styleUrl: './listarasiento.component.css'
})
export class ListarasientoComponent implements OnInit{
  dataSource: MatTableDataSource<Asiento> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

   constructor(private aS: AsientoService) {}

   ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
