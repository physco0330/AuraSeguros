import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajuste',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './ajuste.component.html',
  styleUrls: ['./ajuste.component.scss']
})
export class AjusteComponent implements OnInit {
  usuario: any = {};
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  seccionActiva: string = 'informacion-personal';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  newPasswordPattern: string = `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Aquí deberías cargar los datos del usuario desde un servicio
    this.usuario = {
      nombre: 'Nombre de Usuario',
      correo: 'correo@ejemplo.com',
      telefono: '123456789',
      fotoPerfil: 'assets/default-profile.jpg'
    };
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  actualizarPerfil() {
    // Implementa la lógica para actualizar el perfil del usuario
    console.log('Perfil actualizado', this.usuario);
    // Aquí deberías llamar a un servicio para actualizar los datos en el backend
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  cambiarContrasena() {
    // Verificar si la contraseña actual es correcta
    if (!this.verificarContrasenaActual(this.contrasenaActual)) {
      this.snackBar.open('La contraseña actual es incorrecta', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    // Verificar si la nueva contraseña cumple con los requisitos
    if (!this.nuevaContrasena.match(this.newPasswordPattern)) {
      this.snackBar.open('La nueva contraseña no cumple con los requisitos de seguridad', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    // Aquí deberías llamar a un servicio para actualizar la contraseña en el backend
    if (this.actualizarContrasenaEnBackend(this.nuevaContrasena)) {
      this.snackBar.open('Su contraseña ha sido cambiada correctamente', 'Cerrar', {
        duration: 3000,
      });
      // Limpiar los campos después de cambiar la contraseña
      this.contrasenaActual = '';
      this.nuevaContrasena = '';
      this.confirmarContrasena = '';
    } else {
      this.snackBar.open('Hubo un error al cambiar la contraseña. Por favor, intente de nuevo.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  // Método para verificar la contraseña actual (simulado)
  private verificarContrasenaActual(contrasena: string): boolean {
    // Aquí deberías implementar la lógica real para verificar la contraseña actual
    // Por ahora, simplemente devolvemos true para simular que la contraseña es correcta
    return true;
  }

  // Método para actualizar la contraseña en el backend (simulado)
  private actualizarContrasenaEnBackend(nuevaContrasena: string): boolean {
    // Aquí deberías implementar la lógica real para actualizar la contraseña en el backend
    // Por ahora, simplemente devolvemos true para simular que la actualización fue exitosa
    console.log('Contraseña cambiada a:', nuevaContrasena);
    return true;
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí deberías implementar la lógica para subir la imagen al servidor
      // y actualizar la URL de la foto de perfil
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.fotoPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
/**
 * Método para manejar cualquier lógica de configuración.
 * Puedes personalizarlo según los requisitos de tu aplicación.
 */

