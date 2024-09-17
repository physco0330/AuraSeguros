import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {} // Inyectar el router

  // Método para redirigir a la página de perfil
  goToPerfil() {
    this.router.navigate(['/ajustes']);
  }

  // Método para redirigir a la página de configuraciones
  goToConfiguraciones() {
    this.router.navigate(['/ajustes']);
  }

  // Método para confirmar el cierre de sesión y redirigir al link
  confirmLogout() {
    window.location.href = 'https://aurasseguros.com'; // Redirigir al enlace de cierre de sesión
  }
}
