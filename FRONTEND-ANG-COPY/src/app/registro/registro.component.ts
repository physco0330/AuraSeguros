import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,               // Componente independiente
  imports: [FormsModule, CommonModule]  // Importar módulos necesarios para ngIf y ngForm
})
export class RegistroComponent {

  onSubmit(registroForm: NgForm) {
    if (!registroForm.valid) {
      // Formulario inválido, no hacer nada
      return;
    }

    console.log('Formulario válido, datos:', registroForm.value);

    // Aquí puedes llamar a un servicio para enviar datos al backend

    // Opcional: resetear el formulario
    registroForm.reset();
  }
}
