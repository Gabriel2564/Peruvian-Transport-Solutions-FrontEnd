import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-listarusuario',
  imports: [RouterOutlet],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent {
 constructor(public route:ActivatedRoute) {}
}
