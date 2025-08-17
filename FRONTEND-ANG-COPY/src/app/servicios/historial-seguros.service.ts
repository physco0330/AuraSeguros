import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Historial } from '../modelos/historial.model'; // ajusta la ruta según tu proyecto
import { Bien } from '../modelos/bien.model'; // ajusta la ruta según tu proyecto   

@Injectable({
  providedIn: 'root'
})
export class HistorialSegurosService {
  private baseUrl = 'http://localhost:8080/api/historial-seguros';

  constructor(private http: HttpClient) {}

  // Obtener historial por código
  getHistorialByCodigo(codigo: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/codigo/${codigo}`)
      .pipe(catchError(error => {
        console.error('Error obteniendo historial por código:', error);
        return throwError(() => new Error('Error obteniendo historial por código'));
      }));
  }

  // Obtener historial por idBien
  getHistorialByIdBien(idBien: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/bien/${idBien}`)
      .pipe(catchError(error => {
        console.error('Error obteniendo historial por idBien:', error);
        return throwError(() => new Error('Error obteniendo historial por idBien'));
      }));
  }

  // Crear historial
  crearHistorial(historial: Historial): Observable<Historial> {
    return this.http.post<Historial>(`${this.baseUrl}`, historial)
      .pipe(catchError(error => {
        console.error('Error creando historial:', error);
        return throwError(() => new Error('Error creando historial'));
      }));
  }

  // Actualizar historial
  actualizarHistorial(id: number, historial: Historial): Observable<Historial> {
    return this.http.put<Historial>(`${this.baseUrl}/${id}`, historial)
      .pipe(catchError(error => {
        console.error('Error actualizando historial:', error);
        return throwError(() => new Error('Error actualizando historial'));
      }));
  }

  // Eliminar historial
  eliminarHistorial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(error => {
        console.error('Error eliminando historial:', error);
        return throwError(() => new Error('Error eliminando historial'));
      }));
  }
}
