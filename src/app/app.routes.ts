import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:''
    },
    {
        path:'rutausuario',component:UsuarioComponent
    }
];
