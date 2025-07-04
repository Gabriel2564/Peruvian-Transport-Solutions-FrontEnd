import { Component } from '@angular/core';

@Component({
  selector: 'app-listarruta',
  imports: [],
  templateUrl: './listarruta.component.html',
  styleUrl: './listarruta.component.css'
})
export class ListarrutaComponent {
  dataSource: MatTableDataSource<Viaje> = new MatTableDataSource();
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];
  
}
