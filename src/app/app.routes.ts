import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';

export const routes: Routes = [
      
    {
        path:'rutausuario',component:UsuarioComponent,
        children: [
            {
                path:'listarusuario',
                component:ListarusuarioComponent
            },
             {
                path: 'ediciones/:id',
                component: InsertarusuarioComponent,
            },
         ]
    }
];
