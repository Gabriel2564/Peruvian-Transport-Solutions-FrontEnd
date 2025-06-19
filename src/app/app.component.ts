import { Component } from '@angular/core';
import { PagoComponent } from "./components/pago/pago.component";
import { ItemComponent } from "./components/item/item.component";
import { EstadoComponent } from "./components/estado/estado.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PagoComponent, 
    ItemComponent, 
    EstadoComponent, 
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peruvian-Transport-Solutions-FrontEnd';
}

