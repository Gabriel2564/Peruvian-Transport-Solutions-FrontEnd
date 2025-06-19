import { Component } from '@angular/core';
import { Rol } from '../../../models/Rol';
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
export class ListarrolComponent {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3'];

  constructor(private rolService: RolService) {}
  
  ngOnInit(): void {
    this.rolService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
        //Actualiza la tabla automaticamente
    this.rolService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rolService.deleteI(id).subscribe((data) => {
      this.rolService.list().subscribe((data) => {
        this.rolService.setList(data);
      });
    });
  }
}
