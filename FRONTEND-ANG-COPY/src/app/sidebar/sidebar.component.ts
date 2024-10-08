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

  onLogout() {
    this.showModal = true; // Mostrar el modal cuando se haga clic en "Cerrar sesión"
  }

  confirmLogout() {
    this.showModal = false; // Cerrar el modal
    window.location.href = 'https://aurasseguros.com'; // Redirigir a la página de cierre de sesión en la misma pestaña
  }

  cancelLogout() {
    this.showModal = false; // Cerrar el modal sin hacer nada
  }
}
