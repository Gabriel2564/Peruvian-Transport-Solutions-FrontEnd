import { Component } from '@angular/core';
import { PagoComponent } from "./components/pago/pago.component";
import { ItemComponent } from "./components/item/item.component";

@Component({
  selector: 'app-root',
  imports: [PagoComponent, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peruvian-Transport-Solutions-FrontEnd';
}

