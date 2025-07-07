import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Rol } from '../../../models/Rol';
=======
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Roles } from '../../../models/Roles';
import { RolService } from '../../../services/Rol.service';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolService } from '../../../services/Rol.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-insertarrol',
  imports: [ MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertarrol.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertarrol.component.css'
})
export class InsertarrolComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  rol: Roles = new Roles();
  edicion: boolean = false;
<<<<<<< Updated upstream
  id: number = 0
=======
  id: number = 0;

  opciones = [
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'TURISTA', viewValue: 'TURISTA' },
    { value: 'CONDUCTOR', viewValue: 'CONDUCTOR' }
  ];
>>>>>>> Stashed changes

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
<<<<<<< Updated upstream
    private router: Router,  
    private route:ActivatedRoute
=======
    private router: Router,
    private route: ActivatedRoute,
   
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  ) {}

  ngOnInit(): void { //se ejecuta primero
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null //boleano
      //actualiza y trae la data
      this.init()
    });
    this.form = this.formBuilder.group({
<<<<<<< Updated upstream
      id:[''],
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
    });
=======
      id: [''],
      nombre: ['', Validators.required],
    });


<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }

  aceptar() {
    if (this.form.valid) {
      this.rol.id = this.form.value.id;
<<<<<<< Updated upstream
      this.rol.rol = this.form.value.rol;
      this.rol.usuario = this.form.value.usuario.id;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
=======
      this.rol.rol = this.form.value.nombre;

      const request = this.edicion
        ? this.rS.update(this.rol)
        : this.rS.insert(this.rol);

      request.subscribe(() => {
        this.rS.list().subscribe(data => {
          this.rS.setList(data);
          this.router.navigate(['rutaRol']);
>>>>>>> Stashed changes
        });
      } else {
        //insertar
        this.rS.insert(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rutaRol']);
    }
  }

  init() {
    if (this.edicion) {
<<<<<<< Updated upstream
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol),
          usuario: new FormControl(data.usuario.id),
=======
      this.rS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          id: [data.id],
          nombre: [data.rol, Validators.required],
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        });
      });
    }
  }

}
