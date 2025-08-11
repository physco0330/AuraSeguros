import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // <-- Importa HttpClient
import { Observable } from 'rxjs';

export interface RegistroData {
  nombreUsuario: string;
  correoUsuario: string;
  contrasena: string;
  // agrega más campos si tienes en el formulario
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:8080/api/usuarios'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) { }  // Inyecta HttpClient

  registrarUsuario(data: RegistroData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
