import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Asiento } from '../../../models/Asiento';
import { Bus } from '../../../models/Bus';
import { Estado } from '../../../models/Estado';
import { AsientoService } from '../../../services/Asiento.service';
import { BusService } from '../../../services/Bus.service';
import { EstadoService } from '../../../services/Estado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarasiento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertarasiento.component.html',
  styleUrl: './insertarasiento.component.css'
})
export class InsertarasientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  asiento: Asiento = new Asiento();
  edicion: boolean = false;
  id: number = 0;

  buses: Bus[] = [];
  estados: Estado[] = [];

  constructor(
    private aS: AsientoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bS: BusService,
    private eS: EstadoService
  ) {}

  ngOnInit(): void {
    // inicializar formulario
    this.form = this.formBuilder.group({
      id: [''],
      seatNumberAsiento: ['', Validators.required],
      bus: ['', Validators.required],
      estado: ['', Validators.required],
    });

    // cargar buses y estados
    this.bS.list().subscribe(data => this.buses = data);
    this.eS.list().subscribe(data => this.estados = data);

    // editar
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = !!this.id;
      this.init();
    });
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form.setValue({
          id: data.idAsiento,
          seatNumberAsiento: data.seatNumberAsiento,
          bus: data.bus?.idBus,
          estado: data.estado?.idEstado
        });
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      this.asiento.idAsiento = this.form.value.id;
      this.asiento.seatNumberAsiento = this.form.value.seatNumberAsiento;

      this.asiento.bus = new Bus();
      this.asiento.bus.idBus = this.form.value.bus;

      this.asiento.estado = new Estado();
      this.asiento.estado.idEstado = this.form.value.estado;

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
}
