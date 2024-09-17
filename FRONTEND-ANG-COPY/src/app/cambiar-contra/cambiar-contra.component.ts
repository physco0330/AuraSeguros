import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambiar-contra',
  standalone: true,
  imports: [
    MatIconModule, 
    FormsModule,
    CommonModule
  ],
  templateUrl: './cambiar-contra.component.html',
  styleUrls: ['./cambiar-contra.component.scss']
})
export class CambiarContraComponent {
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  newPasswordPattern: string = `(?=.*[A-Z])(?=.*\W).+`;
  
  constructor(private snackBar: MatSnackBar) {}

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    console.log('Formulario enviado');
    this.snackBar.open('Su contraseña ha sido guardada correctamente', 'Cerrar', {
      duration: 3000,
    });
  }
}
