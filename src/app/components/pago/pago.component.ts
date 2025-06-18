import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Pago } from '../../models/Pago';
import { PagoService } from '../../services/Pago.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listaraplicacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './Pago.component.html',
  styleUrl: './Pago.component.css'
})
export class PagoComponent implements OnInit {
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

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
