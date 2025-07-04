import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/Usuario.service';
import { PagoService } from '../../../services/Pago.service';
import { AsientoService } from '../../../services/Asiento.service';
import { ReservaBoletoService } from '../../../services/Reserva_boleto.service';
import { Usuario } from '../../../models/Usuario';
import { Pago } from '../../../models/Pago';
import { Asiento } from '../../../models/Asiento';
import { Reserva_boleto } from '../../../models/Reserva_boleto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';  // Asegúrate de agregar este módulo también

@Component({
  selector: 'app-insertarreserva-boleto',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './insertarreserva-boleto.component.html',
  styleUrls: ['./insertarreserva-boleto.component.css']
})
export class InsertarreservaBoletoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reserva: Reserva_boleto = new Reserva_boleto();
  listaUsuarios: Usuario[] = [];
  listaPago: Pago[] = [];
  listaAsiento: Asiento[] = [];

  tiposPago = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Tarjeta', viewValue: 'Tarjeta' },
    { value: 'Plin', viewValue: 'Plin' },
    { value: 'Yape', viewValue: 'Yape' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rB: ReservaBoletoService,
    private uS: UsuarioService,
    private pS: PagoService,
    private aS: AsientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ticketAmountReservaBoleto: ['', Validators.required],
      seatQuantityReservaBoleto: [0],
      usuario: ['', Validators.required],
      pago: ['', Validators.required],
      asiento: ['', Validators.required]
    });

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.aS.list().subscribe(data => this.listaAsiento = data);  
    this.pS.list().subscribe(data => this.listaPago = data);  

  }

  aceptar() {
    if (this.form.valid) {
      this.reserva.ticketAmountReservaBoleto = this.form.value.ticketAmountReservaBoleto;
      this.reserva.seatQuantityReservaBoleto = this.form.value.seatQuantityReservaBoleto;
      this.reserva.usuario = { id: this.form.value.usuario } as Usuario;
      this.reserva.asiento = { idAsiento: this.form.value.asiento } as Asiento;
      this.reserva.pago = { idPago: this.form.value.pago } as Pago;

      this.rB.insert(this.reserva).subscribe(() => {
        this.rB.list().subscribe(data => {
          this.rB.setList(data);
          this.router.navigate(['rutaReservaBoleto']);
        });
      });
    }
  }
}

