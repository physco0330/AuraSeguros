import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // cambiar a .scss
})

export class LoginComponent {
  correoUsuario: string = '';
  contrasena: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  onLogin() {
    const url = 'http://localhost:8080/api/auth/login';
    const body = {
      correoUsuario: this.correoUsuario,
      contrasena: this.contrasena
    };

    this.http.post(url, body).subscribe({
      next: (data: any) => {
        this.mensaje = `✅ Bienvenido ${data.nombreUsuario}`;
        console.log('Usuario logueado:', data);
        // Aquí podrías guardar el token o usuario en localStorage
        // localStorage.setItem('usuario', JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.mensaje = '❌ Credenciales inválidas o error en el servidor';
      }
    });
  }
}
