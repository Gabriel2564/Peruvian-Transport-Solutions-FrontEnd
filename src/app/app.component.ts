import { Component } from '@angular/core';
import { PagoComponent } from "./components/pago/pago.component";

@Component({
  selector: 'app-root',
  imports: [PagoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peruvian-Transport-Solutions-FrontEnd';
}

