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
export class InsertarasientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  asiento: Asiento = new Asiento();
  edicion: boolean = false;
  id: number = 0;
  listabuses: Bus[] = [];
  listaestados: Estado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private aS: AsientoService,
    private router: Router,
    private bS: BusService,
    private eS: EstadoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1) Inicializa el form UNA vez
    this.form = this.formBuilder.group({
      id: [''],
      seatNumberAsiento: ['', Validators.required],
      bus: ['', Validators.required],
      estado: ['', Validators.required],
    });

    // 2) Carga buses y estados
    this.bS.list().subscribe(data => this.listabuses = data);
    this.eS.list().subscribe(data => this.listaestados = data);

    // 3) Parámetros de ruta: guardamos id y edicion, y parcheamos sólo IDs
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.aS.listId(this.id).subscribe(data => {
          this.form.patchValue({
            id: data.idAsiento,
            seatNumberAsiento: data.seatNumberAsiento,
            bus: data.bus.idBus,         // <— sólo el ID
            estado: data.estado.statusTypeEstado // <— sólo el ID
          });
        });
      }
    });
  }

  aceptar() {
    if (this.form.invalid) return;

    const fv = this.form.value;

    // 1) Inicializa el modelo
    this.asiento = new Asiento();
    if (this.edicion) {
      this.asiento.idAsiento = this.id;
    }

    // 2) Asigna los campos
    this.asiento.seatNumberAsiento = fv.seatNumberAsiento;

    // 3) Inicializa y asigna sólo el ID a bus y estado
    this.asiento.bus = new Bus();
    this.asiento.bus.idBus = fv.bus;
    this.asiento.estado = new Estado();
    this.asiento.estado.statusTypeEstado = fv.estado;

    // 4) Llamada a servicio
    const request = this.edicion
      ? this.aS.update(this.asiento)
      : this.aS.insert(this.asiento);

    request.subscribe(() => {
      this.aS.list().subscribe(list => {
        this.aS.setList(list);
        this.router.navigate(['rutaAsiento']);
      });
    });
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
