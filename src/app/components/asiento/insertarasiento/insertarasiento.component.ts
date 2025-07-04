import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asiento } from '../../../models/Asiento';
import { Bus } from '../../../models/Bus';
import { Estado } from '../../../models/Estado';
import { AsientoService } from '../../../services/Asiento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstadoService } from '../../../services/Estado.service';
import { BusService } from '../../../services/Bus.service';
import {  MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-insertarasiento',
  imports: [MatOptionModule,ReactiveFormsModule,MatInputModule,MatButtonModule, CommonModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './insertarasiento.component.html',
  styleUrl: './insertarasiento.component.css'
})
export class InsertarasientoComponent implements OnInit{
   form:FormGroup=new FormGroup({})
  asiento:Asiento=new Asiento()
   edicion: boolean = false;
  id: number = 0
  listabuses:Bus[]=[]
  listaestados:Estado[]=[]
  seatNumberAsiento: number=0

   constructor(
    private formBuilder:FormBuilder,
    private aS:AsientoService,
    private router:Router,
    private bS:BusService,
    private eS:EstadoService,
      private route:ActivatedRoute
  ){}

   ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null //boleano
      //actualiza y trae la data
      this.init()
    });
    this.form = this.formBuilder.group({
      id:[''],
      seatNumberAsiento: ['', Validators.required],
      bus: ['', Validators.required],
      estado:['', Validators.required],
    });
    this.bS.list().subscribe(data=>{
        this.listabuses=data
      })
    this.eS.list().subscribe(data=>{
        this.listaestados=data
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.asiento.seatNumberAsiento=this.form.value.seatNumberAsiento
      this.asiento.bus=this.form.value.bus
      this.asiento.estado=this.form.value.estado     
      const request = this.edicion
        ? this.aS.update(this.asiento)
        : this.aS.insert(this.asiento);

      request.subscribe(() => {
        this.aS.list().subscribe(data => {
          this.aS.setList(data);
          this.router.navigate(['rutaAsiento']);
        });
      });    
    }
   
  }

   init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          id: [data.idAsiento],
          seatNumberAsiento: [data.seatNumberAsiento, Validators.required],
          bus: [data.bus, Validators.required],
          estado: [data.estado, Validators.required],

        });
      });
    }
  }


}
