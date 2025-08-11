import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  showModal = false;
  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  // Mostrar modal para confirmar cierre de sesión
  onLogout() {
    this.showModal = true;
  }

  // Confirmar cierre de sesión: borrar token y redirigir a login
  confirmLogout() {
    this.showModal = false;
    localStorage.removeItem('token');  // Aquí eliminas el token para seguridad
    this.router.navigate(['/login']);
  }

  // Cancelar cierre de sesión: cerrar modal sin hacer nada
  cancelLogout() {
    this.showModal = false;
  }
}
