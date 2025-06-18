import { Routes } from '@angular/router';
import { PagoComponent } from './components/pago/pago.component';
import { InsertarpagoComponent } from './components/pago/insertarpago/insertarpago.component';

export const routes: Routes = [{
  path:'rutaPago',component:PagoComponent,
  children:[
    {
      path:'insertar',component:InsertarpagoComponent
    },

    {
      path:'actualizaciones/:id',component:InsertarpagoComponent
    }
  ]
}];