import { Routes } from '@angular/router';

import { PagoComponent } from './components/pago/pago.component';
import { InsertarpagoComponent } from './components/pago/insertarpago/insertarpago.component';

import { ItemComponent } from './components/item/item.component';
import { InsertaritemComponent } from './components/item/insertaritem/insertaritem.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertarrolComponent } from './components/rol/insertarrol/insertarrol.component';

import { EstadoComponent } from './components/estado/estado.component';
import { InsertarestadoComponent } from './components/estado/insertarestado/insertarestado.component';


export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
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
}

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


];

