import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistroService, RegistroData } from '../servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Quitar RegistroService de aquí
})
export class RegistroComponent {

  constructor(private router: Router, private registroService: RegistroService) {}

  onSubmit(registroForm: NgForm) {
    if (!registroForm.valid) {
      return; // Si el formulario es inválido, no hace nada
    }

    const datos: RegistroData = registroForm.value;

    this.registroService.registrarUsuario(datos).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        this.router.navigate(['/login']);
        registroForm.reset();
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        // Aquí puedes mostrar un mensaje de error en la UI
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
