import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegistroComponent {

  constructor(private router: Router) {}

  onSubmit(registroForm: NgForm) {
    if (!registroForm.valid) {
      return; // Si el formulario es inválido, no hace nada
    }

    console.log('Formulario válido, datos:', registroForm.value);

    // Aquí llamarías a tu servicio para registrar en el backend

    // Redirigir al login después del registro
    this.router.navigate(['/login']);

    // Resetear el formulario
    registroForm.reset();
  }

  // 👇 Nuevo método para redirigir desde el enlace
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
