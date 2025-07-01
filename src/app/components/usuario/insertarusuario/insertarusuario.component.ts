import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/Usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
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
  status: boolean = true;

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
      codigo: [''],
      nombre: ['', Validators.required],
      contrasenia: ['', Validators.required],
       estado: [true],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar trae data
      this.init();// solo si estamos editando
    });
  }
aceptar(): void {
  if (this.form.valid) {
    this.usuario.id = +this.form.value.codigo;
    this.usuario.username = this.form.value.nombre;
    this.usuario.password = this.form.value.contrasenia;
    this.usuario.enabled = this.form.value.estado;

    if (this.edicion) {
       //actualizar
       this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
    } else {
      //insertar
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
      });
    }
    this.router.navigate(['rutausuario']);
  }
}


  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
         this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.username),
          contrasenia:new FormControl (data.password),
          estado: new FormControl(data.enabled),
        });
      });
    }
  }
}
