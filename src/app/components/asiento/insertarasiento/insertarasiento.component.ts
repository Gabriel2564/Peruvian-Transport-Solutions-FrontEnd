import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asiento } from '../../../models/Asiento';
import { Bus } from '../../../models/Bus';
import { Estado } from '../../../models/Estado';
import { AsientoService } from '../../../services/Asiento.service';
import { Router } from '@angular/router';
import { EstadoService } from '../../../services/Estado.service';
import { BusService } from '../../../services/Bus.service';

@Component({
  selector: 'app-insertarasiento',
  imports: [],
  templateUrl: './insertarasiento.component.html',
  styleUrl: './insertarasiento.component.css'
})
export class InsertarasientoComponent implements OnInit{
   form:FormGroup=new FormGroup({})
  asiento:Asiento=new Asiento()
  listabuses:Bus[]=[]
  listaestados:Estado[]=[]

   constructor(
    private formBuilder:FormBuilder,
    private aS:AsientoService,
    private router:Router,
    private bS:BusService,
    private eS:EstadoService
  ){}

   ngOnInit(): void {
   

      this.form=this.formBuilder.group({
        seatNumberAsiento:['',Validators.required],
        bus:['',Validators.required],
        estado:['',Validators.required],

      })
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
          this.aS.insert(this.asiento).subscribe(()=>{
                    this.aS.list().subscribe(data=>{
                      this.aS.setList(data)
                    })
                  })
      
      this.router.navigate(['rutaAsiento'])     
    }
   
  }

}
