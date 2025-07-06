import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

import { Reserva_boleto } from '../../../models/Reserva_boleto';
import { Usuario }        from '../../../models/Usuario';
import { Pago }           from '../../../models/Pago';
import { Asiento }        from '../../../models/Asiento';

import { ReservaBoletoService } from '../../../services/Reserva_boleto.service';
import { UsuarioService }       from '../../../services/Usuario.service';
import { PagoService }          from '../../../services/Pago.service';
import { AsientoService }       from '../../../services/Asiento.service';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-insertarreserva-boleto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule, NgxCurrencyDirective
  ],
  templateUrl: './insertarreserva-boleto.component.html',
  styleUrls: ['./insertarreserva-boleto.component.css']
})
export class InsertarreservaBoletoComponent implements OnInit {
  form!: FormGroup;
  id = 0;
  edicion = false;

  listaUsuarios: Usuario[] = [];
  listaPago:     Pago[]    = [];
  listaAsiento:  Asiento[] = [];

  tiposPago = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Tarjeta',  viewValue: 'Tarjeta'  },
    { value: 'Plin',     viewValue: 'Plin'     },
    { value: 'Yape',     viewValue: 'Yape'     }
  ];

  constructor(
    private fb: FormBuilder,
    private rB: ReservaBoletoService,
    private uS: UsuarioService,
    private pS: PagoService,
    private aS: AsientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* 1. FormGroup */
    this.form = this.fb.group({
      ticketAmountReservaBoleto: ['', Validators.required],
      seatQuantityReservaBoleto: ['', Validators.required],
      usuario:  ['', Validators.required],
      pago:     ['', Validators.required],
      asiento:  ['', Validators.required]
    });

    /* 2. Tablas para selects */
    this.uS.list().subscribe(d => (this.listaUsuarios = d));
    this.aS.list().subscribe(d => (this.listaAsiento = d));
    this.pS.list().subscribe(d => (this.listaPago = d));

    /* 3. ¿Modo edición? */
    this.route.params.subscribe((params: Params) => {
      this.id      = params['id'];
      this.edicion = !!this.id;

      if (this.edicion) {
        this.rB.listId(this.id).subscribe(data => {
          this.form.patchValue({
            ticketAmountReservaBoleto: data.ticketAmountReservaBoleto,
            seatQuantityReservaBoleto: data.seatQuantityReservaBoleto,
            usuario:  data.usuario.id,          // usa la clave real de Usuario
            pago:     data.pago.idPago,
            asiento:  data.asiento.idAsiento
          });
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.invalid) return;

    const fv = this.form.value;

    /* Ensambla la entidad */
    const reserva = new Reserva_boleto();
    if (this.edicion) reserva.idReservaBoleto = this.id;

    reserva.ticketAmountReservaBoleto = fv.ticketAmountReservaBoleto;
    reserva.seatQuantityReservaBoleto = fv.seatQuantityReservaBoleto;
    reserva.usuario  = { id:        fv.usuario }  as Usuario;
    reserva.pago     = { idPago:    fv.pago }     as Pago;
    reserva.asiento  = { idAsiento: fv.asiento }  as Asiento;

    const req$ = this.edicion
      ? this.rB.update(reserva)
      : this.rB.insert(reserva);

    req$.subscribe(() => {
      this.rB.list().subscribe(lista => {
        this.rB.setList(lista);
        this.router.navigate(['rutaReservaBoleto']);
      });
    });
  }
}
