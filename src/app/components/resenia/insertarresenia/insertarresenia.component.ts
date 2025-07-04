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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insertarresenia',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertarresenia.component.html',
  styleUrl: './insertarresenia.component.css'
})
export class InsertarreseniaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  resenia: Resenia = new Resenia();
  listaUsuarios: Usuario[] = [];
  listaViajes: Viaje[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReseniaService,
    private uS: UsuarioService,
    private vS: ViajeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contentResenia: ['', Validators.required],
      publicationDateResenia: ['', Validators.required],
      likesResenia: [0],
      usuario: ['', Validators.required],
      viaje: ['', Validators.required],
    });

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.vS.list().subscribe(data => this.listaViajes = data);
  }

  aceptar() {
    if (this.form.valid) {
      this.resenia.contentResenia = this.form.value.contentResenia;
      this.resenia.publicationDateResenia = this.form.value.publicationDateResenia;
      this.resenia.likesResenia = this.form.value.likesResenia;
      this.resenia.usuario = { id: this.form.value.usuario } as Usuario;
      this.resenia.viaje = { idViaje: this.form.value.viaje } as Viaje;

      this.rS.insert(this.resenia).subscribe(() => {
        this.rS.list().subscribe(data => {
          this.rS.setList(data);
          this.router.navigate(['rutaResenia']);
        });
      });
    }
  }
}
