import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/Usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { Rol } from '../../../models/Rol';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarusuario',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertarusuario.component.html',
  styleUrl: './insertarusuario.component.css',
})
export class InsertarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // solo inicializar el form en modo inserción
    if (!this.edicion) {
      this.form = this.formBuilder.group({
        nombre: ['', Validators.required],
        contrasenia: ['', Validators.required],
        estado: [true, Validators.required]
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      if (this.edicion) {
        this.usuario.id = this.form.value.codigo; // solo en edición
      }

      this.usuario.username = this.form.value.nombre;
      this.usuario.password = this.form.value.contrasenia;
      this.usuario.enabled = this.form.value.estado;
      this.usuario.roles = [] as Rol[];  // enviar roles vacío para el DTO

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['rutaUsuario']); // ojo mayúscula
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: [data.id, Validators.required],
          nombre: [data.username, Validators.required],
          contrasenia: [data.password, Validators.required],
          estado: [data.enabled, Validators.required],
        });
      });
    }
  }
}
