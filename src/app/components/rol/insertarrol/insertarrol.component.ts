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
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/Usuario.service';


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

  opciones:{value:string,viewValue:string}[]=[
    {value:'ADMINISTRADOR',viewValue:'ADMINISTRADOR'},
    {value:'TURISTA',viewValue:'TURISTA'},
    {value:'CONDUCTOR',viewValue:'CONDUCTOR'},
  ]

  listaUsuarios:Usuario[]=[]

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,  
    private uS:UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      usu: ['', Validators.required],
    });
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }

 aceptar() {
    if (this.form.valid) {
      this.rol.rol = this.form.value.nombre;
      this.rol.usuario.id = this.form.value.usu;
      this.rS.insert(this.rol).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['rutaRol'])
    }
  }

}
