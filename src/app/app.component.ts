import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from "./components/menu/menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    MenuComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peruvian-Transport-Solutions-FrontEnd';
}

