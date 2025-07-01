import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'rutausuario',
    pathMatch: 'full',
  },
  {
    path: 'rutausuario',
    component: UsuarioComponent,
    children: [
      {
        path: 'listarusuario',
        component: InsertarusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarusuarioComponent,
      },
     
    ],
  },
];

