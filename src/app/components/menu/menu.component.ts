import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HostListener } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() { sessionStorage.clear();
  }
   isVisible = true;
  private lastScroll = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    const current = window.pageYOffset;
    this.isVisible = current < this.lastScroll;
    this.lastScroll = current;
  }
   verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdministrador() {
    return this.role === 'ADMINISTRADOR';
  }

  isTurista() {
    return this.role === 'TURISTA';
  }

  isConductor() {
    return this.role === 'CONDUCTOR';
  }
}
