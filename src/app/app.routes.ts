import { Routes } from '@angular/router';
import { PagoComponent } from './components/pago/pago.component';
import { InsertarpagoComponent } from './components/pago/insertarpago/insertarpago.component';
import { ItemComponent } from './components/item/item.component';
import { InsertaritemComponent } from './components/item/insertaritem/insertaritem.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';


export const routes: Routes = [
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
  path: 'rutaUsuario', component: UsuarioComponent,
  children: [
    { path: 'listarusuario', component: ListarusuarioComponent },
    { path: 'insertarusuario', component: InsertarusuarioComponent },
    { path: 'ediciones/:id', component: InsertarusuarioComponent },
  ]
}

];


