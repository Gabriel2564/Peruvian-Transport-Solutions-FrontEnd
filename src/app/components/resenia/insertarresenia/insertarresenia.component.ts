import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Resenia } from '../../../models/Resenia';
import { Usuario } from '../../../models/Usuario';
import { Viaje } from '../../../models/Viaje';
import { ReseniaService } from '../../../services/Resenia.service';
import { UsuarioService } from '../../../services/Usuario.service';
import { ViajeService } from '../../../services/Viaje.service';
import { Router } from '@angular/router';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-insertarresenia',
  templateUrl: './insertarresenia.component.html',
  styleUrl: './insertarresenia.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatTimepickerModule
  ]
})
export class InsertarreseniaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  resenia: Resenia = new Resenia();

  listaUsuarios: Usuario[] = []
  listaViajes: Viaje[] = []

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReseniaService,
    private uS: UsuarioService,
    private vS: ViajeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contenido: ['', Validators.required],
      hora: ['', Validators.required],
      likes: [0],
      usuarioId: ['', Validators.required],
      viajeId: ['', Validators.required],
    });

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.vS.list().subscribe(data => this.listaViajes = data);
  }

  aceptar() {
    if (this.form.valid) {
      this.resenia.contentResenia = this.form.value.contenido;
      this.resenia.publicationDateResenia = this.form.value.hora;
      this.resenia.likesResenia = this.form.value.likes;
      this.resenia.usuario.id = this.form.value.usuarioId;
      this.resenia.viaje.idViaje = this.form.value.viajeId;

      this.rS.insert(this.resenia).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['rutaResenia'])
    }
  }
}
