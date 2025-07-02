import { Routes } from '@angular/router';

import { PagoComponent } from './components/pago/pago.component';
import { InsertarpagoComponent } from './components/pago/insertarpago/insertarpago.component';

import { ItemComponent } from './components/item/item.component';
import { InsertaritemComponent } from './components/item/insertaritem/insertaritem.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertarrolComponent } from './components/rol/insertarrol/insertarrol.component';

import { EstadoComponent } from './components/estado/estado.component';
import { InsertarestadoComponent } from './components/estado/insertarestado/insertarestado.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { InsertarviajeComponent } from './components/viaje/insertarviaje/insertarviaje.component';
import { BusComponent } from './components/bus/bus.component';
import { ListarbusComponent } from './components/bus/listarbus/listarbus.component';

import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
  path:'rutaUsuario', component:UsuarioComponent,
  children:[
    {
      path:'insertar', component:InsertarusuarioComponent
    },

    {
      path:'actualizaciones/:id', component:InsertarusuarioComponent
    }
  ]
},
  {
  path:'rutaPago', component:PagoComponent,
  children:[
    {
      path:'insertar', component:InsertarpagoComponent
    },

    {
      path:'actualizaciones/:id', component:InsertarpagoComponent
    }
  ]
},
{
  path:'rutaItem',component:ItemComponent,
  children:[
      {
        path:'insertar', component:InsertaritemComponent
      },

      {
        path:'actualizaciones/:id', component:InsertaritemComponent
      }
    ]
},


{
  path:'rutaRol',component:RolComponent,
  children:[
      {
        path:'insertar', component:InsertarrolComponent
      },

      {
        path:'actualizaciones/:id', component:InsertarrolComponent
      }
    ]
},

{
  path:'rutaEstado', component:EstadoComponent,
  children:[
    {
      path:'insertar', component:InsertarestadoComponent
    },

    {
      path:'actualizaciones/:id', component:InsertarestadoComponent
    }
  ]
},

{
  path:'rutaViaje',component:ViajeComponent,
  children:[
      {
        path:'insertar', component:InsertarviajeComponent,
      },

      {
        path:'actualizaciones/:id', component:InsertarviajeComponent,
      }
    ]
},

{
  path:'rutaBus', component:BusComponent,
  children:[
    {
      path:'listar', component:ListarbusComponent,
    }
  ]
},
];