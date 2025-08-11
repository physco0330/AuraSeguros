import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correoUsuario = '';
  contrasena = '';
  mensaje = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
  const url = 'http://localhost:8080/api/auth/login';
  const body = {
    correoUsuario: this.correoUsuario,
    contrasena: this.contrasena
  };

  this.http.post(url, body).subscribe({
    next: (data: any) => {
      // Eliminar la contraseña del objeto antes de guardar
      const { contrasena, ...usuarioSinPassword } = data;

      // Guardar en localStorage como "token"
      localStorage.setItem('token', JSON.stringify(usuarioSinPassword));

      this.mensaje = `✅ Bienvenido ${data.nombreUsuario}`;
      console.log('Usuario logueado:', usuarioSinPassword);

      this.router.navigate(['/inicio']);
    },
    error: (error) => {
      console.error('Error en login:', error);
      this.mensaje = '❌ Credenciales inválidas o error en el servidor';
    }
  });
}


    // 👇 Método para ir al registro
  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToHome() {
    this.router.navigate(['/inicio']);
  }
}
