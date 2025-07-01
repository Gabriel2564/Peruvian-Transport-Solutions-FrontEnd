import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Viaje } from '../../../models/Viaje';
import { ViajeService } from '../../../services/Viaje.service';


@Component({
  selector: 'app-listarviaje',
  imports: [MatTableModule],
  templateUrl: './listarviaje.component.html',
  styleUrl: './listarviaje.component.css'
})
export class ListarviajeComponent implements OnInit {
   dataSource: MatTableDataSource<Viaje> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

   constructor(private vS: ViajeService) {}

   ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
