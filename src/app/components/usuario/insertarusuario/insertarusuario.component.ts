import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/Usuario.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/Rol.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertarusuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insertarusuario.component.html',
  styleUrl: './insertarusuario.component.css',
})
export class InsertarusuarioComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({});
  roles: Rol[] = [];
  usuario: Usuario = new Usuario();
  usuarioId: number = 0;
  edicion: boolean = false;

  opciones = [
    { value: 'TURISTA', viewValue: 'TURISTA' },
    { value: 'CONDUCTOR', viewValue: 'CONDUCTOR' } 
  ];

  constructor(
    private uS: UsuarioService,
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.usuarioId = params['id'];
      this.edicion = this.usuarioId != null;
      this.init();
    });

    this.rS.list().subscribe((rolesData) => {
       this.roles = rolesData;
    });

    this.usuarioForm = this.formBuilder.group({
      id: [''], // opcional
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[], Validators.required],
      enabled: [true, Validators.required],
    });
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.usuarioId).subscribe((data) => {
        this.usuarioForm = this.formBuilder.group({
          id: [data.id], // para pasar el id al actualizar
          username: [data.username, [Validators.required, Validators.minLength(4)]],
          password: [data.password, [Validators.required, Validators.minLength(6)]],
          roles: [data.roles, Validators.required],
          enabled: [data.enabled, Validators.required],
        });
      });
    }
  }

  aceptar() {
    if (this.usuarioForm.valid) {
      const rolesSeleccionados = this.usuarioForm.value.roles.map((rol: string) => ({
        rol: rol
      }))
      const nuevoUsuario: Usuario = {
        id: this.edicion ? this.usuarioId : 0,
        username: this.usuarioForm.value.username,
        password: this.usuarioForm.value.password,
        roles: this.usuarioForm.value.roles,
        enabled: this.usuarioForm.value.enabled,
      };

      if (this.edicion) {
        this.uS.update(nuevoUsuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
            this.router.navigate(['rutaUsuario']);
          });
        });
      } else {
        this.uS.insert(nuevoUsuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
            this.router.navigate(['rutaUsuario']);
          });
        });
      }
    }
  }
}
