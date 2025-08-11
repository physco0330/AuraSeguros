import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://tu-backend/api/auth'; // Ajusta tu URL de backend

  constructor(private http: HttpClient) {}

  login(credentials: { correo_usuario: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Guarda token
        localStorage.setItem('usuario', JSON.stringify(response.usuario)); // Guarda usuario completo
      })
    );
  }

  // Opcional: método para obtener usuario guardado
  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
