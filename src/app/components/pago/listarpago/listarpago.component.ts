import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Pago } from '../../../models/Pago';
import { PagoService } from '../../../services/Pago.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-listarpago',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent implements OnInit{
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3','c4'];

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pagoService.deleteA(id).subscribe(() => {
      this.pagoService.list().subscribe(data => {
        this.pagoService.setList(data);
      });
    });
  }
}
