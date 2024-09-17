// src/app/services/historial.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Historial } from '../modelos/historial.model'; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private baseUrl = 'http://localhost:8080/historial'; // URL base del backend para el historial

  constructor(private http: HttpClient) { }

  // Método para obtener el historial por ID de registro
  getHistorialPorId(id: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/registro/${id}`).pipe(
      catchError(error => {
        console.error('Error obteniendo el historial por ID de registro:', error);
        return throwError(() => new Error('Error obteniendo el historial por ID de registro'));
      })
    );
  }

  // Método para obtener todo el historial
  getHistorial(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/all`).pipe(
      catchError(error => {
        console.error('Error obteniendo todo el historial:', error);
        return throwError(() => new Error('Error obteniendo todo el historial'));
      })
    );
  }

  // Método para agregar un nuevo registro al historial
  agregarHistorial(nuevoHistorial: Historial): Observable<Historial> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Historial>(`${this.baseUrl}/add`, nuevoHistorial, { headers }).pipe(
      catchError(error => {
        console.error('Error agregando el historial:', error);
        return throwError(() => new Error('Error agregando el historial'));
      })
    );
  }

  // Método para eliminar un registro del historial por ID
  eliminarHistorial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`).pipe(
      catchError(error => {
        console.error('Error eliminando el historial:', error);
        return throwError(() => new Error('Error eliminando el historial'));
      })
    );
  }
}
