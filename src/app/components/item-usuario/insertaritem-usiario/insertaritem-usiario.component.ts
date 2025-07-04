import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item_usuario } from '../../../models/Item_usuario';
import { Usuario } from '../../../models/Usuario';
import { Item } from '../../../models/Item';
import { Item_usuarioService } from '../../../services/Item_usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/Usuario.service';
import { ItemService } from '../../../services/Item.service';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-insertaritem-usiario',
  imports: [MatOptionModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,CommonModule,MatSelectModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatFormFieldModule],
  templateUrl: './insertaritem-usiario.component.html',
  styleUrl: './insertaritem-usiario.component.css'
})
export class InsertaritemUsiarioComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  item_usuario:Item_usuario=new Item_usuario()
  edicion: boolean = false;
  estrellas = [1, 2, 3, 4, 5];
  id: number = 0
  listausuarios:Usuario[]=[]
  listaitem:Item[]=[]
  travelDateItemUsuario:string=""
  travelQualificationItemUsuario:number=0

  constructor(
    private formBuilder:FormBuilder,
    private iuS:Item_usuarioService,
    private router:Router,
    private uS:UsuarioService,
    private iS:ItemService,
      private route:ActivatedRoute
  ){}

   ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null //boleano
      //actualiza y trae la data
      this.init()
    });
    this.form = this.formBuilder.group({
      id:[''],
      travelQualificationItemUsuario: [0, Validators.required],
      travelDateItemUsuario: ['', Validators.required],
      item: ['', Validators.required],
      usuario:['', Validators.required],
    });
    this.iS.list().subscribe(data=>{
        this.listaitem=data
      })
    this.uS.list().subscribe(data=>{
        this.listausuarios=data
      })
  } 

  setRating(valor: number) {
    this.form.get('travelQualificationItemUsuario')!.setValue(valor);
  }

  aceptar(){
    
    if(this.form.valid){
      this.item_usuario.travelQualificationItemUsuario=this.form.value.travelQualificationItemUsuario
      this.item_usuario.travelDateItemUsuario=this.form.value.travelDateItemUsuario
      this.item_usuario.item.idItem=this.form.value.item
      this.item_usuario.usuario.id=this.form.value.usuario  
         
      const request = this.edicion
        ? this.iuS.update(this.item_usuario)
        : this.iuS.insert(this.item_usuario);

      request.subscribe(() => {
        this.iuS.list().subscribe(data => {
          this.iuS.setList(data);
          this.router.navigate(['rutaItemUsuario']);
        });
      });    
    }
   
  }

  
   init() {
    if (this.edicion) {
      this.iuS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          id: [data.idItemUsuario],
          travelQualificationItemUsuario: [data.travelQualificationItemUsuario, Validators.required],
          travelDateItemUsuario: [data.travelDateItemUsuario, Validators.required],
          item: [data.item, Validators.required],
          usuario: [data.usuario, Validators.required],

        });
      });
    }
  }
}
