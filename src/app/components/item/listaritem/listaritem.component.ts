import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Item } from '../../../models/Item';
import { ItemService } from '../../../services/Item.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listaritem',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './listaritem.component.html',
  styleUrl: './listaritem.component.css'
})
export class ListaritemComponent {

  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','c6','c7'];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
        //Actualiza la tabla automaticamente
    this.itemService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.itemService.deleteI(id).subscribe(() => {
      this.itemService.list().subscribe(data => {
        this.itemService.setList(data);
      });
    });
  }
}

