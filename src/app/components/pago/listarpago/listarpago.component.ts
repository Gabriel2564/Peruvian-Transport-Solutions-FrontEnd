import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Pago } from '../../../models/Pago';
import { PagoService } from '../../../services/Pago.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-listarpago',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent {

  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3','c4'];

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
        //Actualiza la tabla automaticamente
    this.pagoService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pagoService.deleteP(id).subscribe(() => {
      this.pagoService.list().subscribe(data => {
        this.pagoService.setList(data);
      });
    });
  }
}
