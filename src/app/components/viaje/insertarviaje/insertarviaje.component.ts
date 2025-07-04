import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ruta } from '../../../models/Ruta';
import { RutaService } from '../../../services/Ruta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Viaje } from '../../../models/Viaje';
import { ViajeService } from '../../../services/Viaje.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-insertarviaje',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule, NgxCurrencyDirective],
  templateUrl: './insertarviaje.component.html',
  styleUrl: './insertarviaje.component.css'
})
export class InsertarviajeComponent implements OnInit{
  form:FormGroup = new FormGroup({});
  id: number = 0
  edicion: boolean = false;
  viaje:Viaje=new Viaje();
  departureDateViaje:string=""
  priceViaje:number=0
  departureTimeViaje:string=""
  listaRuta:Ruta[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private vS: ViajeService,
    private router:Router,
    private rS:RutaService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null //boleano
      //actualiza y trae la data
      this.init()
    });
    this.form = this.formBuilder.group({
      departureDateViaje: ['', Validators.required],
      priceViaje: ['', Validators.required],
      departureTimeViaje: ['', Validators.required],
      ruta: ['', Validators.required],
    });
    this.rS.list().subscribe(data=>{
        this.listaRuta=data
      })
  }

  aceptar() {
    if (this.form.valid) {
      this.viaje.departureDateViaje = this.form.value.departureDateViaje;
      this.viaje.priceViaje = this.form.value.priceViaje;
      this.viaje.departureTimeViaje = this.form.value.departureTimeViaje;
      this.viaje.ruta.idRuta = this.form.value.ruta;
      const request = this.edicion
        ? this.vS.update(this.viaje)
        : this.vS.insert(this.viaje);

      request.subscribe(() => {
        this.vS.list().subscribe(data => {
          this.vS.setList(data);
          this.router.navigate(['rutaViaje']);
        });
      });
    }
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          id: [data.idViaje],
          departureDateViaje: [data.departureDateViaje, Validators.required],
          priceViaje: [data.priceViaje, Validators.required],
          departureTimeViaje: [data.departureTimeViaje, Validators.required],
          ruta: [data.ruta, Validators.required],

        });
      });
    }
  }


}
