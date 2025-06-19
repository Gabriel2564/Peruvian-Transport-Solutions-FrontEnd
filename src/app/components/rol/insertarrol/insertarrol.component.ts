import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Rol } from '../../../models/Rol';
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
  rol: Rol = new Rol();
  edicion: boolean = false;
  id: number = 0

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,  
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void { //se ejecuta primero
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null //boleano
      //actualiza y trae la data
      this.init()
    });
    this.form = this.formBuilder.group({
      id:[''],
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.rol.id = this.form.value.id;
      this.rol.rol = this.form.value.rol;
      this.rol.usuario = this.form.value.usuario.id;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
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
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol),
          usuario: new FormControl(data.usuario.id),
        });
      });
    }
  }

}
