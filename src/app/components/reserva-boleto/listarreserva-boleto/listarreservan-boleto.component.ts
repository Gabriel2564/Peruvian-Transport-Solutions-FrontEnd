import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Reserva_boleto } from '../../../models/Reserva_boleto';
import { ReservaBoletoService } from '../../../services/Reserva_boleto.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-listarreservan-boleto',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ],  
  templateUrl: './listarreservan-boleto.component.html',
  styleUrl: './listarreservan-boleto.component.css'
})
export class ListarreservanBoletoComponent implements OnInit {
  dataSource: MatTableDataSource<Reserva_boleto> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private rB: ReservaBoletoService) {}

  ngOnInit(): void {
    this.rB.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rB.deleteA(id).subscribe(() => {
      this.rB.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      });
    });
  }

}
