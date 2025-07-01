import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ruta } from '../../../models/Ruta';
import { RutaService } from '../../../services/Ruta.service';
import { Router } from '@angular/router';
import { Viaje } from '../../../models/Viaje';
import { ViajeService } from '../../../services/Viaje.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarviaje',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertarviaje.component.html',
  styleUrl: './insertarviaje.component.css'
})
export class InsertarviajeComponent implements OnInit{
  form:FormGroup = new FormGroup({});
  viaje:Viaje=new Viaje();

  listaRuta:Ruta[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private vS: ViajeService,
    private router:Router,
    private rS:RutaService
  ) {}

  ngOnInit(): void {
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
      this.vS.insert(this.viaje).subscribe((data) => {
        this.vS.list().subscribe((data) => {
          this.vS.setList(data);
        });
      });
      this.router.navigate(['rutaViaje'])
    }
  }


}
