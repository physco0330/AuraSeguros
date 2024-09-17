import { Component } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajuste',
  standalone: true,
  imports: [RouterModule] ,  // Puedes agregar módulos que este componente necesite
  templateUrl: './ajuste.component.html',
  styleUrls: ['./ajuste.component.scss']  // Cambié a "styleUrls" en lugar de "styleUrl"
})
export class AjusteComponent {
  // Puedes agregar aquí las propiedades y métodos que necesites para el componente.

  constructor(  private router: Router   ) { // Puedes inicializar cualquier dato o servicio que necesites aquí.
    
  }


   // Método para redirigir al módulo de Incendios
   public ircambiarcontra(): void {
    this.router.navigate(['/cambiar-contra']); // Navega a la ruta '/incendio'
  }
}
  /**
   * Método para manejar cualquier lógica de configuración.
   * Puedes personalizarlo según los requisitos de tu aplicación.
   */

