import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Bus } from '../../../models/Bus';
import { BusService } from '../../../services/Bus.service';

@Component({
  selector: 'app-listarbus',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarbus.component.html',
  styleUrl: './listarbus.component.css'
})
export class ListarbusComponent implements OnInit{
  dataSource: MatTableDataSource<Bus> = new MatTableDataSource()
  displayedColums: string[]=["bus1","bus2","bus3","bus4","bus5"]

  constructor(private bS:BusService){}

  ngOnInit(): void {
      this.bS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }
}
