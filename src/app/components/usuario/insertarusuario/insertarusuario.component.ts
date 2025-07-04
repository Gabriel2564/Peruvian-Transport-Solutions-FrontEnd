import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/Usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { Rol } from '../../../models/Rol';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarusuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule
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
    this.form = this.formBuilder.group({
      id: [null], // el id solo en edición
      nombre: ['', Validators.required],
      contrasenia: ['', Validators.required],
      estado: [true, Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.id = this.form.value.id; // null o un valor en edición
      this.usuario.username = this.form.value.nombre;
      this.usuario.password = this.form.value.contrasenia;
      this.usuario.enabled = this.form.value.estado;
      this.usuario.roles = [] as Rol[];

      const request = this.edicion
        ? this.uS.update(this.usuario)
        : this.uS.insert(this.usuario);

      request.subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.router.navigate(['rutaUsuario']);
        });
      });
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: [data.id],
          username: [data.username, Validators.required],
          password: [data.password, Validators.required],
          enabled: [data.enabled, Validators.required],
        });
      });
    }
  }
}
